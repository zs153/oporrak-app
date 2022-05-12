import axios from 'axios'
import { tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  let tipo = {
    idtipo: req.body.idtipo,
  }

  try {
    if (result.data) {
      const ret = await axios.post('http://localhost:8000/api/subtipos/tipo', {
        tipo,
      })

      tipo = result.data
      const datos = {
        subtipos: ret.data,
        tipo,
      }

      res.render('admin/subtipos', { user, datos })
    } else {
      const msg = 'No se ha podido acceder a los datos de la aplicación.'

      res.render('admin/error400', {
        alerts: [{ msg }],
      })
    }
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  let tipo = {
    idtipo: req.body.idtipo,
  }
  const documento = {
    idsubt: 0,
    dessub: '',
  }

  try {
    const datos = {
      tipo,
      documento,
    }

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
    const result = await axios.post('http://localhost:8000/api/subtipo', {
      subtipo,
    })
    const datos = {
      subtipo: result.data,
    }

    res.render('admin/subtipos/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

export const subtiposPage = async (req, res) => {
  const user = req.user
  let tipo = {
    idtipo: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/tipo', {
      tipo,
    })

    if (result.data) {
      const ret = await axios.post('http://localhost:8000/api/subtipos/tipo', {
        tipo,
      })

      tipo = result.data
      const datos = {
        subtipos: ret.data,
        tipo,
      }

      res.render('admin/subtipos', { user, datos })
    } else {
      const msg = 'No se ha podido acceder a los datos de la aplicación.'

      res.render('admin/error400', {
        alerts: [{ msg }],
      })
    }
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addSubtipoPage = async (req, res) => {
  const user = req.user
  let tipo = {
    idtipo: req.params.id,
  }
  const subtipo = {
    idsubt: 0,
    dessub: '',
  }

  try {
    const datos = {
      tipo,
      subtipo,
    }

    res.render('admin/subtipos/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editSubtipoPage = async (req, res) => {
  const user = req.user
  const tipo = {
    idtipo: req.params.id,
  }
  const subtipo = {
    idsubt: req.params.idsub,
  }

  try {
    const result = await axios.post('http://localhost:8000/api/subtipo', {
      subtipo,
    })
    const datos = {
      tipo,
      subtipo: result.data,
    }

    res.render('admin/subtipos/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

export const insertSubtipo = async (req, res) => {
  const user = req.user
  const tipo = {
    idtipo: req.body.idtipo,
  }
  const subtipo = {
    dessub: req.body.dessub,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearSubtipo,
  }

  try {
    await axios.post('http://localhost:8000/api/subtipos/insert', {
      tipo,
      subtipo,
      movimiento,
    })

    res.redirect(`/admin/subtipos/tipo/${tipo.idtipo}`)
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
export const updateSubtipo = async (req, res) => {
  const user = req.user
  const tipo = {
    idtipo: req.body.idtipo,
  }
  const subtipo = {
    idsubt: req.body.idsubt,
    dessub: req.body.dessub,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarSubtipo,
  }

  try {
    await axios.post('http://localhost:8000/api/subtipos/update', {
      subtipo,
      movimiento,
    })

    res.redirect(`/admin/subtipos/tipo/${tipo.idtipo}`)
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
export const deleteSubtipo = async (req, res) => {
  const user = req.user
  const tipo = {
    idtipo: req.body.idtipo,
  }
  const subtipo = {
    idsubt: req.body.idsubt,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarSubtipo,
  }

  try {
    await axios.post('http://localhost:8000/api/subtipos/delete', {
      subtipo,
      movimiento,
    })

    res.redirect(`/admin/subtipos/tipo/${tipo.idtipo}`)
  } catch (error) {
    const msg = 'No se ha podido elminar el subtipo.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
