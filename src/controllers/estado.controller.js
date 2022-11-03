import axios from 'axios'
import { arrTiposPerfil } from '../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const lastDayMonth = new Date(currentYear, currentMonth +1, 0).getDate()
  const desde = new Date(currentYear, currentMonth, 1, 1, 0, 0).toISOString().split('T')[0]
  const hasta = new Date(currentYear, currentMonth, lastDayMonth, 1,0,0).toISOString().split('T')[0]

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
export const estadisticaPage = async (req, res) => {
  const user = req.user
  const periodo = {
    desde: req.body.desde,
    hasta: req.body.hasta,
  }
  const tipo = {
    destip: req.body.destip,
  }
  const fraude = {
    tipfra: req.body.tipfra,
    reffra: req.body.refcar,
  }
  const carga = {
    refcar: req.body.refcar,
  }

  try {
    const situacion = await axios.post('http://localhost:8100/api/fraudes/stat/situacion', {
      periodo,
      fraude,
    })
    const hitos = await axios.post('http://localhost:8100/api/fraudes/stat/hitos', {
      periodo,
      fraude,
    })
    const oficinas = await axios.post('http://localhost:8100/api/fraudes/stat/oficinas', {
      carga,
    })
    const actuacion = await axios.post('http://localhost:8100/api/fraudes/stat/actuacion', {
      periodo,
      fraude,
    })

    const serieL = []
    const serieS = []
    const serieC = []

    actuacion.data.map(itm => {
      serieC.push({ x: itm.FEC, y: itm.COR })
      serieL.push({ x: itm.FEC, y: itm.LIQ })
      serieS.push({ x: itm.FEC, y: itm.SAN })
    })

    const totalSituacion = situacion.data.TOTAL
    const ratios = {
      // propuestaLiquidacion: Math.round((hitos.data.PROLIQ * 100 / totalSituacion) * 100) / 100.0,
      // propuestaSancion: Math.round((hitos.data.PROSAN * 100 / totalSituacion) * 100) / 100.0,
      correctas: Math.round((situacion.data.CORREC * 100 / totalSituacion) * 100) / 100.0,
      liquidacion: Math.round((hitos.data.LIQUID * 100 / totalSituacion) * 100) / 100.0,
      sancion: Math.round((hitos.data.SANCIO * 100 / totalSituacion) * 100) / 100.0,
      // anulacion: Math.round((hitos.data.ANUSAN * 100 / totalSituacion) * 100) / 100.0,
    }

    const datos = {
      fraude,
      periodo: { desde: new Date(periodo.desde).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }), hasta: new Date(periodo.hasta).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) },
      tipo,
      hitos: hitos.data,
      oficinas: oficinas.data,
      situacion: situacion.data,
      ratios,
      serieC: JSON.stringify(serieC),
      serieL: JSON.stringify(serieL),
      serieS: JSON.stringify(serieS),
    }

    res.render('admin/estadisticas/fraudes', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
