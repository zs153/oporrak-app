import axios from 'axios'
import {
  origenTipo,
  arrOrigenTipo,
  tiposMovimiento,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.get('http://localhost:8000/api/subtipos')
    const datos = { subtipos: result.data.dat }

    res.render('admin/subtipos', { user, datos })
  } catch (error) {
    res.redirect('/')
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const subtipo = {
    idsubt: 0,
    dessub: '',
    idtipo: 0,
  }

  try {
    const resultTipos = await axios.get('http://localhost:8000/api/tipos')
    const datos = {
      subtipo,
      arrTipos: resultTipos.data.dat,
    }

    res.render('admin/subtipos/add', { user, datos })
  } catch (error) {
    res.redirect('/admin/subtipos')
  }
}
export const editPage = async (req, res) => {
  const user = req.user

  try {
    const resultTipos = await axios.get('http://localhost:8000/api/tipos')
    const result = await axios.post('http://localhost:8000/api/subtipo', {
      idsubt: req.params.id,
    })

    const subtipo = {
      idsubt: result.data.idsubt,
      dessub: result.data.dessub,
      idtipo: result.data.idtipo,
      idtold: result.data.idtipo,
    }
    const datos = {
      subtipo,
      arrTipos: resultTipos.data.dat,
    }

    res.render('admin/subtipos/edit', { user, datos })
  } catch (error) {
    res.redirect('/admin/subtipos')
  }
}
export const insertSubtipo = async (req, res) => {
  const user = req.user
  const subtipo = {
    dessub: req.body.dessub,
    idtipo: req.body.idtipo,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearSubtipo,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/subtipos/insert',
      {
        subtipo,
        movimiento,
      }
    )

    res.redirect('/admin/subtipos')
  } catch (error) {
    res.redirect('/admin/subtipos')
  }
}
export const updateSubtipo = async (req, res) => {
  const user = req.user
  const subtipo = {
    idsubt: req.body.idsubt,
    dessub: req.body.dessub,
    idtold: req.body.idtold,
    idtipo: req.body.idtipo,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarSubtipo,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/subtipos/update',
      {
        subtipo,
        movimiento,
      }
    )

    res.redirect('/admin/subtipos')
  } catch (error) {
    res.redirect('/admin/subtipos')
  }
}
export const deleteSubtipo = async (req, res) => {
  const user = req.user
  const subtipo = {
    idsubt: req.body.idsubt,
  }
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarSubtipo,
  }

  try {
    const result = await axios.post(
      'http://localhost:8000/api/subtipos/delete',
      {
        subtipo,
        movimiento,
      }
    )

    res.redirect('/admin/subtipos')
  } catch (error) {
    res.redirect('/admin/subtipos')
  }
}
