import axios from 'axios'
import { tiposEstado, tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const oficinas = await axios.post('http://localhost:8100/api/oficinas')
    const datos = {
      oficinas: oficinas.data,
      tiposMovimiento,
      tiposEstado,
    }

    res.render('admin/traspasos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
