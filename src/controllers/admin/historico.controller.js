import axios from 'axios'
import { serverAPI, puertoAPI } from '../../config/settings'
import {
  estadosUsuario,
  tiposMovimiento,
  tiposRol,
} from '../../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let hasPrevUsers = false
  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let context = {}

  if (cursor) {
    hasPrevUsers = true
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/historicos`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit + 1
    let nextCursor = ''
    let prevCursor = ''

    if (hasNextUsers) {
      const nextCursorUser = dir === 'next' ? usuarios[limit - 1] : usuarios[0]
      const prevCursorUser = dir === 'next' ? usuarios[0] : usuarios[limit - 1]
      nextCursor = nextCursorUser.NOMUSU
      prevCursor = prevCursorUser.NOMUSU

      usuarios.pop()
    } else {
      if (dir === 'prev') {
        context = {
          limit: limit + 1,
          direction: 'next',
          cursor: {
            next: '',
            prev: ''
          },
          part,
        }

        const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/historicos`, {
          context,
        })

        usuarios = result.data.data
        hasNextUsers = usuarios.length === limit + 1

        if (hasNextUsers) {
          const nextCursorUser = usuarios[limit - 1]
          const prevCursorUser = usuarios[0]
          nextCursor = nextCursorUser.NOMUSU
          prevCursor = prevCursorUser.NOMUSU

          usuarios.pop()
        }

        hasPrevUsers = false
      } else {
        if (cursor) {
          const prevCursorUser = usuarios[0]
          prevCursor = prevCursorUser.NOMUSU
          hasPrevUsers = true
        } else {
          hasPrevUsers = false
        }

        hasNextUsers = false
      }
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      limit,
      usuarios: dir === 'next' ? usuarios : usuarios.sort((a, b) => a.NOMUSU > b.NOMUSU ? 1 : -1),
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),      
    }

    res.render('admin/historicos', { user, datos })
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
export const activar = async (req, res) => {
  const user = req.user

  try {
    const oficina = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficina`, {
      context: {
        CODOFI: req.body.codofi
      }
    })
    
    if (oficina.data.stat) {
      const usuario = {
        IDUSUA: req.body.idusua,
        OFIUSU: oficina.data.data.IDOFIC,
        ROLUSU: tiposRol.usuario,
        STAUSU: estadosUsuario.activo,
      }
      const movimiento = {
        USUMOV: user.id,
        TIPMOV: tiposMovimiento.activarUsuario,
      }
  
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/historicos/activar`, {
        usuario,
        movimiento,
      })
    }
    
    res.redirect('/admin/historicos')
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
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}