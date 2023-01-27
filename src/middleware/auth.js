import { createPublicKey } from 'crypto'
import { V4 } from 'paseto'
import { tiposRol } from '../public/js/enumeraciones'
import { publicKey } from '../config/settings'

const authRoutes = async (req, res, next) => {
  let tokenHeader = req.cookies.auth

  if (typeof tokenHeader === 'undefined') {
    const token = req.query.valid
    const options = {
      path: "/",
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 6, // 6 horas
      httpOnly: true,
    }
    res.cookie('auth', token, options)
    tokenHeader = token
  }

    try {
      // paseto public
      const key = createPublicKey({
        'key': publicKey,
        'format': 'pem',
        'type': 'spki',
      })
      await V4.verify(tokenHeader, key, {
        audience: 'urn:client:claim',
        issuer: 'http://localhost:4000',
        clockTolerance: '1 min',
      }).then(r => {
        req.user = {
          id: r.id,
          userID: r.userid,
          rol: r.rol,
          oficina: r.oficina,
        }

        next()
      }).catch(err => {
        //console.log('Error de clave pública. No se puede verificar la clave pública')
        res.redirect('/')
      })
    } catch {
      //console.log('Error de clave pública. No se puede crear la clave pública')
      res.redirect('/')
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