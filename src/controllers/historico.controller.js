import axios from 'axios'
import { serverAPI } from '../config/settings'
import {
  tiposMovimiento,
  tiposRol,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const usuario = {}

  try {
    const result = await axios.post(`http://${serverAPI}:8200/api/historicos`, {
      usuario
    })
    const datos = {
      historicos: result.data,
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


export const activar = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
    OFIUSU: req.body.ofiusu,
    STAUSU: req.body.stausu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.activarUsuario,
  }

  try {
    await axios.post(`http://${serverAPI}:8200/api/historicos/activar`, {
      usuario,
      movimiento,
    })

    res.redirect('/admin/historicos')
  } catch (error) {
    const msg = 'No se ha podido activar al usuario.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
