import axios from 'axios'

export const fraudePage = async (req, res) => {
  const user = req.user
  const periodo = {
    desde: '2022-01-01', 
    hasta: '2022-12-31',
  }

  try {
    const result = await axios.post('http://localhost:8000/api/fraudes/estadisticas', {
      periodo,
    })

    const datos = {
      fraudes: JSON.stringify(result.data),
    }

    res.render('admin/estadisticas/fraudes', { user, datos})
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
