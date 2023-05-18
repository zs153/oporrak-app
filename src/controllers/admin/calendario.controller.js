import axios from 'axios'
import { serverAPI, puertoAPI } from '../../config/settings'
import { tiposMovimiento, estadosUsuario, tiposEstado, tiposRol, arrTiposEstado, arrColoresEstado } from '../../public/js/enumeraciones'

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
      oficina: user.rol === tiposRol.admin ? 0 : user.oficina,
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      oficina: user.rol === tiposRol.admin ? 0 : user.oficina,
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit + 1
    let nextCursor = ''
    let prevCursor = ''

    if (hasNextUsers) {
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
      usuarios,
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosUsuario,
    }

    res.render('admin/calendarios', { user, datos })
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
  const desde = dateISOToUTCString(`${currentYear}-01-01T00:00:00`)
  const hasta = dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`)

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context: {
        IDUSUA: req.query.id,
      },
    })
    const estados = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuario`, {
      context: {
        USUEST: usuario.data.data[0].IDUSUA,
        DESDE: desde,
        HASTA: hasta,
      },
    })
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos/oficinas`, {
      context: {
        OFIFES: usuario.data.data[0].OFIUSU,
        DESDE: desde,
        HASTA: hasta,  
      },
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
      arrTiposEstado,
      arrColoresEstado,
      tiposEstado,
      estadosUsuario,
      festivos: JSON.stringify(festivos.data.data),
      usuario: usuario.data.data[0],
      dataSource: JSON.stringify(dataSource),
    }

    res.render(`admin/calendarios/calendario`, { user, datos })
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

    res.redirect(`/admin/calendarios?part=${req.query.part}`)
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