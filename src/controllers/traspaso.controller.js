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
    OFIFES: undefined,
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
    const festivosComun = ret.data.filter(itm => itm.OFIFES === 0)
    const festivosLocal = ret.data.filter(itm => itm.OFIFES > 0)

    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      usuario,
    })
    usuario = {
      IDUSUA: ret.data.IDUSUA,
      OFIUSU: ret.data.OFIUSU,
      NOMUSU: ret.data.NOMUSU,
    }

    ret = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuarios`, {
      estado,
    })

    let dataSource = []
    ret.data.map(itm => {
      if (itm.TIPEST === tiposEstado.traspaso.ID) {
        const estado = ret.data[ret.data.findIndex(el => el.STRFEC === itm.STRFEC && el.TIPEST === tiposEstado.traspasado.ID)]
        const rec = {
          idesta: itm.IDESTA,
          ofiest: estado.OFIEST,
          startDate: itm.STRFEC,
          endDate: itm.STRFEC,
          rangoH: `${estado.DESOFI}\n(${itm.DESHOR} a ${itm.HASHOR})`,
          color: `${tiposEstado.traspaso.COLOR}`
        }
        dataSource.push(rec)
      }
    })
    const datos = {
      oficinas,
      festivosComun: JSON.stringify(festivosComun),
      festivosLocal: JSON.stringify(festivosLocal),
      usuario: JSON.stringify(usuario),
      dataSource: JSON.stringify(dataSource),
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
export const update = async (req, res) => {
  const user = req.user
  const usuario = JSON.parse(req.body.usuario)
  const eventos = JSON.parse(req.body.eventos)
  let estados = []

  eventos.map(itm => {
    if (itm.idesta === 0) {
      // traspaso
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: tiposEstado.traspaso.ID,
        OFIEST: usuario.OFIUSU,
      })
      //traspasado
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: tiposEstado.traspasado.ID,
        OFIEST: itm.ofiest,
      })
    } else {
      // borrado (el idesta borra el traspaso y fecest, usuest y tipest borra el traspasado)
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: tiposEstado.traspasado.ID,
        OFIEST: 0,
      })
    }
  })

  const traspasos = {
    ARRTRA: estados // importante!! los campos del array estados tienen que ir en mayusculas
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTraspaso,
    TIPMOZ: tiposMovimiento.borrarTraspaso,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/update/traspasos`, {
      traspasos,
      movimiento,
    });

    mainPage(req, res)
  } catch (error) {
    const msg = "No se ha podido insertar los datos.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
}

// helpers
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}