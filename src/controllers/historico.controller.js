import axios from 'axios'
import { scrypt } from 'crypto'
import { serverAPI, puertoAPI, secreto } from '../config/settings'
import {
  estadosUsuario,
  tiposMovimiento,
  tiposRol,
} from '../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const usuario = {}
  const oficina = {}
  try {
    const historicos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/historicos`, {
      usuario
    })
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina
    })
    const datos = {
      historicos: historicos.data,
      oficinas: oficinas.data,
      tiposRol,
    }

    res.render('admin/historicos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc
export const activar = async (req, res) => {
  const user = req.user
  const seed = Math.random().toString(36).substring(2, 10);

  try {
    await hash(seed).then(async (pass) => {    
      const usuario = {
        IDUSUA: req.body.idusua,
        OFIUSU: req.body.ofiusu,
        ROLUSU: tiposRol.usuario,
        STAUSU: estadosUsuario.activo,
      }
      const recurso = {
        PWDUSU: pass,
        SEED: seed,
      }
      const movimiento = {
        USUMOV: user.id,
        TIPMOV: tiposMovimiento.activarUsuario,
      }

      await axios.post(`http://${serverAPI}:${puertoAPI}/api/historicos/activar`, {
        usuario,
        recurso,
        movimiento,
      })

      res.redirect('/admin/historicos')
    }).catch(err => {
      throw err
    })
  } catch (error) {
    const msg = 'No se ha podido activar al usuario.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// helpers
const hash = async (password) => {
  return new Promise((resolve, reject) => {
    scrypt(password, secreto, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('base64'))
    });
  })
}
