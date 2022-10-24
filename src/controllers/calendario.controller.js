import axios from 'axios'
import { tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const estado = {
    usuest: user.id,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/estados/usuarios', {
      estado,
    })
    const datos = {
      eventos: JSON.stringify(result.data),
    }

    res.render('admin/calendarios', { user, datos })
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
    res.render('admin/calendarios/add', { user })
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
    idofic: req.params.id,
  }
  try {
    const result = await axios.post('http://localhost:8100/api/calendario', {
      calendario,
    })
    const datos = {
      oficina: result.data,
    }

    res.render('admin/calendarios/edit', { user, datos })
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
    await axios.post('http://localhost:8100/api/calendarios/insert', {
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
export const update = async (req, res) => {
  const user = req.user
  const calendario = {
    //TODO
    idofic: req.body.idofic,
    desofi: req.body.desofi.toUpperCase(),
    codofi: req.body.codofi.toUpperCase(),
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarOficina,
  }

  try {
    await axios.post('http://localhost:8100/api/calendarios/update', {
      calendario,
      movimiento,
    })

    res.redirect('/admin/calendarios')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos del calendario. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'La oficina ya existe'
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
    await axios.post('http://localhost:8100/api/calendarios/delete', {
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
