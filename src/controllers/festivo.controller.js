import axios from 'axios'
import { puertoAPI, serverAPI } from '../config/settings'
import { tiposRol, tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: user.oficina }
  const currentYear = new Date().getFullYear()
  const festivo = {
    DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    HASTA: dateISOToUTCString(`${currentYear}-12-31T00:00:00`),
  }

  try {
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos`, {
      festivo
    })
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina
    })
    const datos = {
      festivos: festivos.data,
      oficinas: oficinas.data,
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

// helpers
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset)
    .toISOString()
    .slice(0, 10)
}