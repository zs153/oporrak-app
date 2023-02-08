import axios from 'axios'
import { serverAPI, puertoAPI } from '../config/settings'
import { tiposEstado, tiposRol, tiposMovimiento, arrTiposEstado, arrTiposEstadoUsuario, arrColoresEstado } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = {
  }
  const usuario = {
  }

  try {
    let oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    let usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      usuario,
    })

    if (req.user.rol === tiposRol.admin) {
      oficinas = oficinas.data
      usuarios = usuarios.data
    } else if (req.user.rol === tiposRol.responsable) {
      oficinas = oficinas.data.filter(itm => itm.IDOFIC === req.user.oficina)
      usuarios = usuarios.data.filter(itm => itm.OFIUSU === req.user.oficina)
    } else {
      oficinas = oficinas.data.filter(itm => itm.IDOFIC === req.user.oficina)
      usuarios = usuarios.data.filter(itm => itm.IDUSUA === req.user.id)
    }

    const datos = {
      oficinas,
      usuarios,
      tiposEstado,
      tiposRol,
      arrTiposEstado: req.user.rol === tiposRol.usuario ? arrTiposEstadoUsuario : arrTiposEstado,
      arrColoresEstado,
      tiposMovimiento,
      serverAPI,
      puertoAPI,
    }

    res.render('admin/calendarios', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc
export const insert = async (req, res) => {
  const user = req.user
  const calendario = {
    // TODO
    desofi: req.body.desofi.toUpperCase(),
    codofi: req.body.codofi.toUpperCase(),
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearOficina,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/calendarios/insert`, {
      calendario,
      movimiento,
    })

    res.redirect('/admin/calendarios')
  } catch (error) {
    let msg = 'No se ha podido crear el calendario.'

    if (error.response.data.errorNum === 20100) {
      msg = 'La oficina ya existe.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const calendario = {
    idcale: req.body.idcale,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarOficina,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/calendarios/delete`, {
      calendario,
      movimiento,
    })

    res.redirect('/admin/calendarios')
  } catch (error) {
    const msg = 'No se ha podido elminar el calendario.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
