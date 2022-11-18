import axios from 'axios'
import { tiposRol, tiposEstado, arrTiposPerfil } from '../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const lastDayMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const desde = new Date(currentYear, currentMonth, 1, 1, 0, 0).toISOString().split('T')[0]
  const hasta = new Date(currentYear, currentMonth, lastDayMonth, 1, 0, 0).toISOString().split('T')[0]

  try {
    let oficinas = await axios.post('http://localhost:8200/api/oficinas')

    if (req.user.rol === tiposRol.admin) {
      oficinas = oficinas.data
    } else {
      oficinas = oficinas.data.filter(itm => itm.IDOFIC === req.user.oficina)
    }

    const datos = {
      oficinas,
      arrTiposPerfil,
      tiposRol,
      desde,
      hasta,
    }

    res.render('admin/estados', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc
export const mensualPage = async (req, res) => {
  const user = req.user
  const periodo = {
    desde: req.body.desde,
    hasta: req.body.hasta,
  }
  const estado = {
    OFIEST: parseInt(req.body.ofiest),
    PERUSU: parseInt(req.body.perusu),
    DESDE: periodo.desde,
    HASTA: periodo.hasta,
  }
  const descripcionOficina = req.body.desofi
  const descripcionPerfil = req.body.desper
  const diasPeriodo = Math.ceil(Date.parse(periodo.hasta) - Date.parse(periodo.desde)) / (1000 * 60 * 60 * 24) + 1

  try {
    const festivos = await axios.post('http://localhost:8200/api/festivos/oficinas', {
      desde: new Date(periodo.desde).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      hasta: new Date(periodo.hasta).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      ofifes: estado.OFIEST
    })
    const estados = await axios.post('http://localhost:8200/api/estados/oficinas/perfiles', {
      estado,
    })
    
    const datos = {
      estados: estados.data,
      festivos: festivos.data,
      tiposEstado,
      tiposRol,
      arrTiposPerfil,
      periodo,
      diasPeriodo,
      strDesde: new Date(periodo.desde).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      strHasta: new Date(periodo.hasta).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      descripcionOficina,
      descripcionPerfil,
    }

    res.render('admin/estados/estados', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const semanalPage = async (req, res) => {
  const user = req.user
  const periodo = {
    desde: req.body.desde,
    hasta: req.body.hasta,
  }
  const estado = {
    OFIEST: parseInt(req.body.ofiest),
    PERUSU: parseInt(req.body.perusu),
    DESDE: periodo.desde,
    HASTA: periodo.hasta,
  }
  const descripcionOficina = req.body.desofi
  const descripcionPerfil = req.body.desper
  const diasPeriodo = Math.ceil(Date.parse(periodo.hasta) - Date.parse(periodo.desde)) / (1000 * 60 * 60 * 24) + 1

  try {
    const festivos = await axios.post('http://localhost:8200/api/festivos/oficinas', {
      desde: periodo.desde,
      hasta: periodo.hasta,
      ofifes: estado.OFIEST
    })
    const estados = await axios.post('http://localhost:8200/api/estados/oficinas/perfiles', {
      estado,
    })

    const datos = {
      estados: estados.data,
      festivos: festivos.data,
      tiposEstado,
      tiposRol,
      arrTiposPerfil,
      periodo,
      diasPeriodo,
      strDesde: new Date(periodo.desde).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      strHasta: new Date(periodo.hasta).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      descripcionOficina,
      descripcionPerfil,
    }

    if (req.body.format === '1') {
      res.render('admin/estados/mensual', { user, datos })
    } else {
      res.render('admin/estados/semanal', { user, datos })
    }
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
