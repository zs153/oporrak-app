import axios from 'axios'
import { serverAPI, puertoAPI } from '../config/settings'
import { tiposRol, tiposMovimiento, tiposEstado, arrTiposEstadoUsuario, arrTiposEstado, arrColoresEstado } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = user.rol === tiposRol.admin ? {}:{IDOFIC: user.oficina}
  const usuario = user.rol === tiposRol.admin ? {} : tiposRol.usuario ? { IDUSUA: user.id } : { OFIUSU: user.oficina }

  try {
    let oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    let usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      usuario,
    })

    const datos = {
      oficinas: oficinas.data,
      usuarios: usuarios.data,
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
export const calendario = async (req, res) => {
  const user = req.user
  let currentYear = new Date().getFullYear()
  const estado = {
    idofic: req.body.idofic,
    usuest: req.body.idusua,
    tipest: 0,
    desde: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    hasta: dateISOToUTCString(`${currentYear +1}-12-31T00:00:00`),
  }
  const usuario = {
    IDUSUA: req.body.idusua,
  }

  try {
    const estados = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuarios`, {
      estado,
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      usuario,
    })

    const datos = {
      estados: estados.data,
      usuario: result.data,
      tiposEstado,
      tiposRol,
      arrTiposEstado: req.user.rol === tiposRol.usuario ? arrTiposEstadoUsuario : arrTiposEstado,
      arrColoresEstado,
      tiposMovimiento,
      serverAPI,
      puertoAPI,
    }

    res.render('admin/calendarios/calendario', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
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


// helpers
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}