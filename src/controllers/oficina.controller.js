import axios from 'axios'
import { serverAPI, puertoAPI } from "../config/settings";
import { tiposRol, tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = {}

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    const datos = {
      oficinas: result.data,
      tiposRol,
    }

    res.render('admin/oficinas', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user

  try {
    res.render('admin/oficinas/add', { user })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const oficina = {
    IDOFIC: req.params.id,
  }
  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficina`, {
      oficina,
    })
    const datos = {
      oficina: result.data,
      tiposRol,
    }

    res.render('admin/oficinas/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const insert = async (req, res) => {
  const user = req.user
  const oficina = {
    DESOFI: req.body.desofi.toUpperCase(),
    CODOFI: req.body.codofi.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearOficina,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas/insert`, {
      oficina,
      movimiento,
    })

    res.redirect('/admin/oficinas')
  } catch (error) {
    let msg = 'No se ha podido crear la oficina.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const oficina = {
    IDOFIC: req.body.idofic,
    DESOFI: req.body.desofi.toUpperCase(),
    CODOFI: req.body.codofi.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarOficina,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas/update`, {
      oficina,
      movimiento,
    })

    res.redirect('/admin/oficinas')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos de la oficina.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const oficina = {
    IDOFIC: req.body.idofic,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarOficina,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas/delete`, {
      oficina,
      movimiento,
    })

    res.redirect('/admin/oficinas')
  } catch (error) {
    const msg = 'No se ha podido borrar la oficina.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
