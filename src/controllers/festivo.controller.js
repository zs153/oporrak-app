import axios from 'axios'
import { tiposRol, tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const oficinas = await axios.post('http://localhost:8200/api/oficinas')
    const datos = {
      oficinas: oficinas.data,
      tiposRol,
      tiposMovimiento,
    }

    res.render('admin/festivos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
