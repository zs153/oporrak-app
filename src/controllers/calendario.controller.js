import axios from 'axios'
import { tiposEstado, tiposMovimiento, arrTiposEstado, arrColoresEstado } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const oficinas = await axios.post('http://localhost:8100/api/oficinas')
    const usuarios = await axios.post('http://localhost:8100/api/usuarios')
    const datos = {
      oficinas: oficinas.data,
      usuarios: usuarios.data,
      tiposEstado,
      arrTiposEstado,
      arrColoresEstado,
      tiposMovimiento,
    }

    res.render('admin/calendarios', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// vaciones calendar
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
