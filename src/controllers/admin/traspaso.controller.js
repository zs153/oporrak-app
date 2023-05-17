import axios from 'axios'
import { serverAPI, puertoAPI } from "../../config/settings";
import { estadosUsuario, tiposEstado, tiposMovimiento } from '../../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevUsers = cursor ? true : false
  let context = {}

  if (cursor) {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: '',
        prev: '',
      },
      part,
    }
  }

  try {
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficina`, {
      context: {},
    })
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit + 1
    let nextCursor = ''
    let prevCursor = ''
    let alerts = undefined

    if (hasNextUsers) {
      alerts = [{ msg: 'Se supera el límite de registros permitidos. Sólo se muestran 99 registros. Refine la consulta' }]      
      nextCursor = dir === 'next' ? usuarios[limit - 1].NOMUSU : usuarios[0].NOMUSU
      prevCursor = dir === 'next' ? usuarios[0].NOMUSU : usuarios[limit - 1].NOMUSU

      usuarios.pop()
    } else {
      nextCursor = dir === 'next' ? '' : usuarios[0]?.NOMUSU
      prevCursor = dir === 'next' ? usuarios[0]?.NOMUSU : ''

      if (cursor) {
        hasNextUsers = nextCursor === '' ? false : true
        hasPrevUsers = prevCursor === '' ? false : true
      } else {
        hasNextUsers = false
        hasPrevUsers = false
      }
    }

    if (dir === 'prev') {
      usuarios = usuarios.sort((a, b) => a.NOMUSU.localeCompare(b.NOMUSU))
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      oficinas: oficinas.data.data,
      usuarios,
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosUsuario,
    }

    res.render('admin/traspasos', { user, alerts, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const calendarioPage = async (req, res) => {  
  const user = req.user
  const currentYear = new Date().getFullYear()
  const periodo = {
    DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    HASTA: dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`),
  }

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context: {
        IDUSUA: req.params.id,
      },
    })    
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficina`, {
      context: {},
    })
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos`, {
      context: {
        DESDE: periodo.DESDE,
        HASTA: periodo.HASTA,
      }
    })
    const estados = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuario`, {
      context: {
        USUEST: req.params.id,
        DESDE: periodo.DESDE,
        HASTA: periodo.HASTA,
      },
    })
    const festivosComun = festivos.data.data.filter(itm => itm.OFIFES === 0)
    const festivosLocal = festivos.data.data.filter(itm => itm.OFIFES > 0)
    
    let dataSource = []
    estados.data.data.map(itm => {
      if (itm.TIPEST === tiposEstado.traspaso.ID) {
        itm.TIPEST = tiposEstado.traspasado.ID
        const estado = estados.data.data[estados.data.data.indexOf(itm)]
        const rec = {
          idesta: itm.IDESTA,
          ofiest: estado.OFIEST,
          startDate: estado.STRFEC,
          endDate: estado.STRFEC,
          rangoH: `${estado.DESOFI}\n(${estado.DESHOR} a ${estado.HASHOR})`,
          color: `${tiposEstado.traspaso.COLOR}`
        }
        dataSource.push(rec)
      }
    })

    const datos = {
      oficinas: oficinas.data.data,
      festivosComun: festivosComun,
      festivosLocal: festivosLocal,
      tiposEstado,
      usuario: usuario.data.data[0],
      dataSource: JSON.stringify(dataSource),
    }

    res.render(`admin/traspasos/calendario`, { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// proc
export const update = async (req, res) => {
  const user = req.user
  const eventos = JSON.parse(req.body.eventos)
  let estados = []

  eventos.map(itm => {
    if (itm.idesta === 0) {
      // traspaso
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: req.body.idusua,
        TIPEST: tiposEstado.traspaso.ID,
        OFIEST: req.body.ofiusu,
      })
      //traspasado
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: req.body.idusua,
        TIPEST: tiposEstado.traspasado.ID,
        OFIEST: itm.ofiest,
      })
    } else {
      // borrado (el IDESTA borra el traspaso y FECEST, USUEST y TIPOEST borra el traspasado)
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: req.body.idusua,
        TIPEST: tiposEstado.traspasado.ID,
        OFIEST: 0,
      })
    }
  })

  const context = {
    ARRTRA: estados // importante!! los campos del array estados tienen que ir en mayusculas
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTraspaso,
    TIPMOZ: tiposMovimiento.borrarTraspaso,
  }

  try {
    if (estados.length !== 0) {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/update/traspasos`, {
        context,
        movimiento,
      });
    }

    res.redirect(`/admin/traspasos?part=${req.query.part}`)
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
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
