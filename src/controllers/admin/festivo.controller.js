import axios from 'axios'
import { puertoAPI, serverAPI } from '../../config/settings'
import { tiposEstado, tiposMovimiento } from '../../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let hasPrevOficinas = cursor ? true:false
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
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      context,
    })

    let oficinas = result.data.data
    let hasNextOficinas = oficinas.length === limit +1
    let nextCursor = 0
    let prevCursor = 0
    
    if (hasNextOficinas) {
      const nextCursorOficinas = dir === 'next' ? oficinas[limit - 1] : oficinas[0]
      const prevCursorOficinas = dir === 'next' ? oficinas[0] : oficinas[limit - 1]
      nextCursor = nextCursorOficinas.IDOFIC
      prevCursor = prevCursorOficinas.IDOFIC

      oficinas.pop()
    } else {
      const nextCursorOficinas = dir === 'next' ? 0 : oficinas[0]
      const prevCursorOficinas = dir === 'next' ? oficinas[0] : 0
      nextCursor = nextCursorOficinas.IDOFIC
      prevCursor = prevCursorOficinas.IDOFIC
      
      if (cursor) {
        hasNextOficinas = nextCursorOficinas === 0 ? false : true
        hasPrevOficinas = prevCursorOficinas === 0 ? false : true
      } else {
        hasNextOficinas = false
        hasPrevOficinas = false
      }
    }

    if (dir === 'prev') {
      oficinas = oficinas.reverse()
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      oficinas,
      hasNextOficinas,
      hasPrevOficinas,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/festivos', { user, datos })
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

  try {
    const oficina = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficina`, {
      context: {
        IDOFIC: req.params.id,
      },
    })
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos/locales`, {
      context: {
        OFIFES: req.params.id,
        DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
        HASTA: dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`),
      },
    })

    let dataSource = []
    if (festivos.data.stat) {
      dataSource = festivos.data.data.map(itm => ({
        idfest: itm.IDFEST,
        fecfes: itm.FECFES,
        ofifes: itm.OFIFES,
        startDate: itm.FECFES,
        endDate: itm.FECFES,
        color: tiposEstado.festivo.COLOR,
      }))
    }

    const datos = {
      oficina: oficina.data.data,
      dataSource: JSON.stringify(dataSource),
      tiposEstado,
    }

    res.render(`admin/festivos/calendario`, { user, datos })
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
  let festivos = []

  eventos.map(itm => {
    // importante!! los campos del array festivos tienen que ir en mayusculas
    if (itm.idfest < 0) {
      // insertar
      festivos.push({
        IDFEST: 0,
        FECFES: itm.fecfes,
        OFIFES: itm.ofifes,
      })
    } else {
      // borrar
      festivos.push({
        IDFEST: itm.idfest,
        FECEST: '',
        OFIEST: 0,
      })
    }
  })

  const context = {
    ARRFES: festivos
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEstado,
    TIPMOZ: tiposMovimiento.borrarEstado,
  }

  try {
    if (festivos.length !== 0) {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos/update`, {
        context,
        movimiento,
      });
    }

    res.redirect(`/admin/festivos?part=${req.query.part}`)
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