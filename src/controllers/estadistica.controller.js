import axios from 'axios'

export const fraudePage = async (req, res) => {
  const user = req.user
  const periodo = {
    desde: '2022-01-01', 
    hasta: '2022-12-31',
  }
  const tipo = {
    tipfra: 51,
  }

  try {
    const hitos = await axios.post('http://localhost:8000/api/fraudes/stat/hitos', {
      periodo,
      tipo,
    })
    const oficinas = await axios.post('http://localhost:8000/api/fraudes/stat/oficinas', {
      periodo,
      tipo,
    })
    const situacion = await axios.post('http://localhost:8000/api/fraudes/stat/situacion', {
      periodo,
      tipo,
    })
    const actuacion = await axios.post('http://localhost:8000/api/fraudes/stat/actuacion', {
      periodo,
      tipo,
    })

    const serieL = []
    const serieS = []

    actuacion.data.map(itm => {
      serieL.push({x: new Date(itm.FECHIT),y: itm.LIQUID})
      serieS.push({x: new Date(itm.FECHIT),y: itm.SANCIO})
    })

    const totalSituacion = situacion.data.ACTSIT + situacion.data.CORSIT
    const ratios = {
      propuestaLiquidacion: Math.round((hitos.data.PROLIQ * 100 / totalSituacion) * 100) / 100.0,
      propuestaSancion: Math.round((hitos.data.PROSAN * 100 / totalSituacion) * 100) / 100.0,
      liquidacion: Math.round((hitos.data.LIQUID * 100 / totalSituacion) * 100) / 100.0,
      sancion: Math.round((hitos.data.SANCIO * 100 / totalSituacion) * 100) / 100.0,
      anulacion: Math.round((hitos.data.ANUSAN * 100 / totalSituacion) * 100) / 100.0,
      correctas: Math.round((situacion.data.CORSIT * 100 / totalSituacion) * 100) / 100.0,
    }
    const datos = {
      hitos: hitos.data,
      oficinas: oficinas.data,
      situacion: situacion.data,
      ratios,
      serieL: JSON.stringify(serieL),
      serieS: JSON.stringify(serieS),
    }

    res.render('admin/estadisticas/fraudes', { user, datos})
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
