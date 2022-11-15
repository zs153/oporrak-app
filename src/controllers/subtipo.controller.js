import axios from 'axios'
import { tiposRol, tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post('http://localhost:8200/api/subtipos')
    const datos = {
      subtipos: JSON.stringify(result.data),
      tiposRol,
    }

    res.render('admin/subtipos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const datos = {
    tiposRol,
  }
  try {
    res.render('admin/subtipos/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const subtipo = {
    idsubt: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8200/api/subtipo', {
      subtipo,
    })
    const datos = {
      subtipo: result.data,
      tiposRol,
    }

    res.render('admin/subtipos/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

export const insert = async (req, res) => {
  const user = req.user
  const subtipo = {
    dessub: req.body.dessub.toUpperCase(),
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearSubtipo,
  }

  try {
    await axios.post('http://localhost:8200/api/subtipos/insert', {
      subtipo,
      movimiento,
    })

    res.redirect(`/admin/subtipos`)
  } catch (error) {
    let msg = 'No se ha podido crear el subtipo.'

    if (error.response.data.errorNum === 20100) {
      msg = 'El subtipo ya existe.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const subtipo = {
    idsubt: req.body.idsubt,
    dessub: req.body.dessub.toUpperCase(),
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarSubtipo,
  }

  try {
    await axios.post('http://localhost:8200/api/subtipos/update', {
      subtipo,
      movimiento,
    })

    res.redirect(`/admin/subtipos`)
  } catch (error) {
    let msg =
      'No se han podido modificar los datos del subtipo. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'El subtipo ya existe'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const subtipo = {
    idsubt: req.body.idsubt,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarSubtipo,
  }

  try {
    await axios.post('http://localhost:8200/api/subtipos/delete', {
      subtipo,
      movimiento,
    })

    res.redirect(`/admin/subtipos`)
  } catch (error) {
    const msg = 'No se ha podido elminar el subtipo.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
