import axios from 'axios'
import { arrEstadosMatricula, estadosMatricula, tiposMovimiento } from '../public/js/enumeraciones'

// page matriculas
export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const result = await axios.post('http://localhost:8100/api/matriculas')
    const datos = {
      matriculas: JSON.stringify(result.data),
      arrEstadosMatricula,
    }

    res.render('admin/matriculas', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  const fecha = new Date();
  const matricula = {
    strini: fecha.toISOString().slice(0, 10),
    strfin: fecha.toISOString().slice(0, 10),
    stamat: estadosMatricula.cerrado,
  }
  const datos = {
    matricula,
    arrEstadosMatricula,
  }

  try {
    res.render('admin/matriculas/add', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const matricula = {
    idmatr: req.params.id,
  }

  try {
    const result = await axios.post('http://localhost:8100/api/matricula', {
      matricula,
    })
    const datos = {
      matricula: result.data,
      arrEstadosMatricula,
    }

    res.render('admin/matriculas/edit', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc matriculas
export const insert = async (req, res) => {
  const user = req.user
  const matricula = {
    desmat: req.body.descur.toUpperCase(),
    inimat: req.body.inimat,
    finmat: req.body.finmat,
    idcurs: req.body.idcurs,
    stamat: req.body.stamat,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearMatricula,
  }

  try {
    await axios.post('http://localhost:8100/api/matriculas/insert', {
      matricula,
      movimiento,
    })

    res.redirect('/admin/matriculas')
  } catch (error) {
    let msg = 'No se ha podido crear la matrícula.'

    if (error.response.data.errorNum === 20100) {
      msg = 'La matrícula ya existe.'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const update = async (req, res) => {
  const user = req.user
  const matricula = {
    idmatr: req.body.idmatr,
    desmat: req.body.descur.toUpperCase(),
    inimat: req.body.inimat,
    finmat: req.body.finmat,
    idcurs: req.body.idcurs,
    stamat: req.body.stamat,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarMatricula,
  }

  try {
    await axios.post('http://localhost:8100/api/matriculas/update', {
      matricula,
      movimiento,
    })

    res.redirect('/admin/matriculas')
  } catch (error) {
    let msg =
      'No se han podido modificar los datos de la matrícula. Verifique los datos introducidos'

    if (error.response.data.errorNum === 20100) {
      msg = 'La matrícula ya existe'
    }

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const matricula = {
    idmatr: req.body.idmatr,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarMatricula,
  }

  try {
    await axios.post('http://localhost:8100/api/matriculas/delete', {
      matricula,
      movimiento,
    })

    res.redirect('/admin/matriculas')
  } catch (error) {
    const msg = 'No se ha podido elminar la matrícula.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
