import axios from 'axios'
import { tiposEstado, arrTiposPerfil } from '../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const lastDayMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const desde = new Date(currentYear, currentMonth, 1, 1, 0, 0).toISOString().split('T')[0]
  const hasta = new Date(currentYear, currentMonth, lastDayMonth, 1, 0, 0).toISOString().split('T')[0]

  try {
    const oficinas = await axios.post('http://localhost:8100/api/oficinas')
    const datos = {
      oficinas: oficinas.data,
      arrTiposPerfil,
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
export const estadosPage = async (req, res) => {
  const user = req.user
  const periodo = {
    desde: req.body.desde,
    hasta: req.body.hasta,
  }
  const estado = {
    OFIEST: req.body.ofiest,
    PERUSU: req.body.perusu,
    DESDE: periodo.desde,
    HASTA: periodo.hasta,
  }
  const descripcionOficina = req.body.desofi
  const descripcionPerfil = req.body.desper
  const diasPeriodo = Math.ceil(new Date(periodo.hasta).getDate() - new Date(periodo.desde).getDate(), (1000 * 60 * 60 * 24)) + 1

  try {
    const oficinas = await axios.post('http://localhost:8100/api/oficinas')
    const festivos = await axios.post('http://localhost:8100/api/festivos/oficinas', {
      desde: estado.DESDE,
      hasta: estado.HASTA,
      ofifes: estado.OFIEST
    })
    const estados = await axios.post('http://localhost:8100/api/estados/oficinas/perfiles', {
      estado,
    })
    const datos = {
      estados: estados.data,
      oficinas: oficinas.data,
      festivos: festivos.data,
      tiposEstado,
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
