import axios from 'axios'
import { serverAPI, puertoAPI } from '../../config/settings'
import { tiposRol, tiposMovimiento, estadosUsuario, tiposEstado, arrTiposEstadoUsuario, arrTiposEstado, arrColoresEstado } from '../../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const context = {
    IDUSUA: user.id,
  }

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/stats`, {
      context,
    })

    const datos = {
      estadosUsuario,
      usuario: usuario.data.data[0],
    }

    res.render(`user/calendarios`, { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const calendarioPage = async (req, res) => {
  const user = req.user
  const currentYear = new Date().getFullYear()
  const usuario = JSON.parse(req.body.usuario)
  const estado = {
    USUEST: usuario.IDUSUA,
    DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    HASTA: dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`),
  }
  const festivo = {
    OFIFES: usuario.OFIUSU,
    DESDE: estado.DESDE,
    HASTA: estado.HASTA,
  }

  try {
    const estados = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuario`, {
      estado,
    })
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos/oficinas`, {
      festivo,
    })
    
    let dataSource = []
    estados.data.data.map(itm => {
      if (itm.TIPEST !== tiposEstado.traspasado.ID &&
        itm.TIPEST !== tiposEstado.traspaso.ID) {
        const rec = {
          idesta: itm.IDESTA,
          tipest: itm.TIPEST,
          startDate: itm.STRFEC,
          endDate: itm.STRFEC,
          rangoH: `${arrColoresEstado[itm.TIPEST].DES} (${itm.DESHOR} a ${itm.HASHOR})`,
          color: `${arrColoresEstado[itm.TIPEST].COLOR}`,
          deshor: itm.DESHOR,
          hashor: itm.HASHOR,
        }
        dataSource.push(rec)
      }
    })

    const datos = {
      arrTiposEstado: user.rol === tiposRol.usuario ? arrTiposEstadoUsuario : arrTiposEstado,
      arrColoresEstado,
      tiposEstado,
      festivos: JSON.stringify(festivos.data.data),
      usuario,
      dataSource: JSON.stringify(dataSource),
    }

    res.render(`user/calendarios/calendario`, { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// proc
export const update = async (req, res) => {
  const user = req.user
  const usuario = JSON.parse(req.body.usuario)
  const eventos = JSON.parse(req.body.eventos)
  let estados = []

  eventos.map(itm => {
    if (itm.idesta < 0) {
      // insertar
      estados.push({
        IDESTA: 0,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: itm.tipest,
        OFIEST: usuario.OFIUSU,
        DESHOR: itm.deshor,
        HASHOR: itm.hashor,
      })
    } else {
      // borrar
      estados.push({
        IDESTA: itm.idesta,
        FECEST: '',
        USUEST: 0,
        TIPEST: 0,
        OFIEST: 0,
        DESHOR: '',
        HASHOR: '',
      })
    }
  })

  const context = {
    ARREST: estados // importante!! los campos del array estados tienen que ir en mayusculas
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEstado,
    TIPMOZ: tiposMovimiento.borrarEstado,
  }

  try {
    if (estados.length !== 0) {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/update`, {
        context,
        movimiento,
      });
    }

    res.redirect("/user/calendarios")
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });      
    }
  }
}

// helpers
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}