import axios from 'axios'
import { puertoAPI, serverAPI } from '../config/settings'
import { tiposEstado } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  let ret
  let dataSource = []

  const user = req.user
  const oficina = {}
  const currentYear = new Date().getFullYear()
  const festivo = {
    DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    HASTA: dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`),
  }

  try {
    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina
    })
    const oficinas = ret.data

    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos`, {
      festivo
    })
    const festivosComun = ret.data.filter(itm => itm.OFIFES === 0)
    const festivosLocal = ret.data.filter(itm => itm.OFIFES > 0)

    ret.data.map(itm => {
      dataSource.push({
        idfest: itm.IDFEST,
        ofifes: itm.OFIFES,
        startDate: itm.FECFES,
        endDate: itm.FECFES,
        color: `${tiposEstado.festivo.COLOR}`,
      })
    })

    const datos = {
      festivosComun: JSON.stringify(festivosComun),
      festivosLocal: JSON.stringify(festivosLocal),
      dataSource: JSON.stringify(dataSource),
      oficinas,
      tiposEstado,
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