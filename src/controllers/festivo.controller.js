import axios from 'axios'
import { puertoAPI, serverAPI } from '../config/settings'
import { tiposRol, tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: user.oficina }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina
    })
    const datos = {
      oficinas: result.data,
      tiposRol,
      tiposMovimiento,
      serverAPI,
      puertoAPI,
    }

    res.render('admin/festivos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
