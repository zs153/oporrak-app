import axios from 'axios'
import { createPublicKey, createSecretKey } from 'crypto'
import { V4, V3 } from 'paseto'
import { tiposRol } from '../public/js/enumeraciones'
import { publicKey, puertoAPI, puertoWEB, secreto, serverAPI, serverWEB, serverAUTH, puertoAUTH } from '../config/settings'

const authRoutes = async (req, res, next) => {
  let tokenHeader = req.cookies.auth

  try {
    const localKey = createSecretKey(new Buffer.from(secreto, 'hex'));

    if (typeof tokenHeader === 'undefined') {
      const token = req.query.valid

      // paseto public
      const key = createPublicKey({
        'key': publicKey,
        'format': 'pem',
        'type': 'spki',
      })
      await V4.verify(token, key, {
        audience: 'urn:client:claim',
        issuer: 'http://localhost:4000',
        clockTolerance: '1 min',
      }).then(async ret => {
        const usuario = {
          USERID: ret.userid,
        }

        const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
          usuario,
        })

        const payload = {
          id: result.data.IDUSUA,
          userid: result.data.USERID,
          rol: result.data.ROLUSU,
          oficina: result.data.OFIUSU,
        }

        // paseto local
        const localToken = await V3.encrypt(payload, localKey, {
          audience: 'urn:example:client',
          issuer: 'http://localhost:4000',
          expiresIn: '6 hours'
        })

        // crear cookie
        const options = {
          path: "/",
          sameSite: true,
          maxAge: 1000 * 60 * 60 * 6, // 6 horas
          httpOnly: true,
        }

        tokenHeader = localToken

        res.cookie('auth', localToken, options)
        res.cookie('verPan', 1, { path: '/admin' })

        return res.render('admin/clean', { serverWEB, puertoWEB })
      }).catch(err => {
        return res.redirect('/')
      })
    }

    // paseto local
    await V3.decrypt(tokenHeader, localKey, {
      audience: 'urn:example:client',
      issuer: 'http://localhost:4000',
      clockTolerance: '1 min',
    }).then(r => {
      req.user = {
        id: r.id,
        userid: r.userid,
        rol: r.rol,
        oficina: r.oficina,
      }

      next()
    }).catch(err => {
      return res.redirect('/')
    })
  } catch (error) {
    return res.redirect('/')
  }
}

export const verifyTokenAndAdmin = (req, res, next) => {
  authRoutes(req, res, () => {
    if (req.user.rol === tiposRol.admin) {
      next()
    } else {
      res.status(410).json('No tienes autorización')
    }
  })
}
export const verifyTokenAndResp = (req, res, next) => {
  authRoutes(req, res, () => {
    if (req.user.rol === tiposRol.responsable || req.user.rol === tiposRol.admin) {
      next()
    } else {
      res.status(410).json('No tienes autorización')
    }
  })
}

export default authRoutes