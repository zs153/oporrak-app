import axios from 'axios'
import {
  origenTipo,
  arrOrigenTipo,
  tiposMovimiento,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.get('http://localhost:8000/api/tipos')

    res.render('admin/tipos', { user, tipos: result.data.dat, arrOrigenTipo })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const tipo = {
    idtipo: 0,
    destip: '',
    ayutip: '',
    orgtip: origenTipo.formulario,
  }

  try {
    const datos = {
      tipo,
      arrOrigenTipo,
    }

    res.render('admin/tipos/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post('http://localhost:8000/api/tipo', {
      id: req.params.id,
    })

    const tipo = {
      idtipo: result.data.idtipo,
      destip: result.data.destip,
      ayutip: result.data.ayutip,
      orgtip: result.data.orgtip,
    }
    const datos = {
      tipo,
      arrOrigenTipo,
    }

    res.render('admin/tipos/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const insertTipo = async (req, res) => {
  const user = req.user
  const tipo = {
    destip: req.body.destip,
    ayutip: req.body.ayutip,
    orgtip: req.body.orgtip,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearTipo,
  }
  console.log(tipo)
  try {
    await axios.post('http://localhost:8000/api/tipos/insert', {
      tipo,
      movimiento,
    })

    res.redirect('/admin/tipos')
  } catch (error) {
    let msg = 'No se ha podido crear el tipo.'

    if (error.response.data.errorNum === 20100) {
      msg = 'El tipo ya existe.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const updateTipo = async (req, res) => {
  const user = req.user
  const tipo = {
    idtipo: req.body.idtipo,
    destip: req.body.destip,
    ayutip: req.body.ayutip,
    orgtip: req.body.orgtip,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarTipo,
  }

  try {
    axios.post('http://localhost:8000/api/tipos/update', {
      tipo,
      movimiento,
    })

    res.redirect('/admin/tipos')
  } catch (error) {
    let msg =
      'No se ha podido actualizar el tipo. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'El tipo ya existe'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const deleteTipo = async (req, res) => {
  const user = req.user
  const tipo = {
    idtipo: req.body.idtipo,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarTipo,
  }

  try {
    await axios.post('http://localhost:8000/api/tipos/delete', {
      tipo,
      movimiento,
    })

    res.redirect('/admin/tipos')
  } catch (error) {
    const msg = 'No se ha podido elminar el tipo.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
