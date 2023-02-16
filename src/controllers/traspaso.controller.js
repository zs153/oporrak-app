import axios from 'axios'
import { serverAPI, puertoAPI } from "../config/settings";
import { tiposRol, tiposEstado, tiposMovimiento } from '../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: user.oficina }
  const usuario = user.rol === user.rol === tiposRol.usuario ? { IDUSUA: user.id } : { OFIUSU: user.oficina }

  try {
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      usuario,
    })
    const datos = {
      oficinas: oficinas.data,
      usuarios: usuarios.data,
      serverAPI,
      puertoAPI,
    }

    res.render('admin/traspasos', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc
export const calendario = async (req, res) => {
  const user = req.user
  let currentYear = new Date().getFullYear()
  const estado = {
    IDOFIC: 0,
    USUEST: req.body.idusua,
    TIPEST: 0,
    OFIDES: 0,
    DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    HASTA: dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`),
  }
  let usuario = {
    IDUSUA: req.body.idusua,
  }
  const oficina = {}
  const festivo = {
    OFIFES: '0',
    DESDE: estado.DESDE,
    HASTA: estado.HASTA,
  }

  let ret
  try {
    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    const oficinas = ret.data

    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos`, {
      festivo,
    })
    const festivos = ret.data

    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      usuario,
    })
    usuario = ret.data

    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuarios`, {
      estado,
    })
    let dataSource = []
    ret.data.map(itm => {
      let desOficina
      if (itm.TIPEST === tiposEstado.traspaso.ID) {
        desOficina = ret.data[ret.data.findIndex(el => el.STRFEC === itm.STRFEC && el.TIPEST === tiposEstado.traspasado.ID)].DESOFI
        const estado = {
          idesta: itm.IDESTA,
          usuest: itm.USUEST,
          tipest: itm.TIPEST,
          startDate: new Date(itm.STRFEC),
          endDate: new Date(itm.STRFEC),
          rangoH: `${desOficina}\n(${itm.DESHOR} a ${itm.HASHOR})`,
          color: `${tiposEstado.traspaso.COLOR}`
        }
        dataSource.push(estado)
      } else if (itm.TIPEST === 0) {
        const estado = {
          idesta: itm.IDESTA,
          usuest: itm.USUEST,
          tipest: itm.TIPEST,
          startDate: new Date(itm.STRFEC),
          endDate: new Date(itm.STRFEC),
          rangoH: `Festivo`,
          color: `${tiposEstado.festivo.COLOR}`,
        }
        dataSource.push(estado)
      }
    })
    const datos = {
      oficinas,
      festivos,
      usuario,
      dataSource,
      tiposEstado,
      tiposMovimiento,
      serverAPI,
      puertoAPI,
    }

    res.render('admin/traspasos/calendario', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}

// helpers
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}