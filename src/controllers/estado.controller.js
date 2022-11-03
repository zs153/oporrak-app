import axios from 'axios'
import { arrTiposPerfil } from '../public/js/enumeraciones'

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
  const descripcionOficina = req.body.desofi
  const descripcionPerfil = req.body.desper

  try {
    const oficinas = await axios.post('http://localhost:8100/api/oficinas')
    const datos = {
      oficinas: oficinas.data,
      arrTiposPerfil,
      periodo: {
        desde: new Date(periodo.desde).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
        hasta: new Date(periodo.hasta).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      },
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
