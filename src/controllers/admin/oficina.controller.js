import axios from 'axios'
import { serverAPI, puertoAPI } from "../../config/settings";
import { tiposRol, tiposMovimiento } from '../../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let hasPrevOficinas = false
  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let context = {}

  if (cursor) {
    hasPrevOficinas = true
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      context,
    })

    let oficinas = result.data.data
    let hasNextOficinas = oficinas.length === limit +1
    let nextCursor = ''
    let prevCursor = ''

    if (hasNextOficinas) {
      const nextCursorOficinas = dir === 'next' ? oficinas[limit - 1] : oficinas[0]
      const prevCursorOficinas = dir === 'next' ? oficinas[0] : oficinas[limit - 1]
      nextCursor = nextCursorOficinas.NOMUSU
      prevCursor = prevCursorOficinas.NOMUSU

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
        
        const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
          context,
        })
        
        oficinas = result.data.data
        hasNextOficinas = oficinas.length === limit + 1
        
        if (hasNextOficinas) {
          const nextCursorOficinas = oficinas[limit - 1]
          const prevCursorOficinas = oficinas[0]
          nextCursor = nextCursorOficinas.NOMUSU
          prevCursor = prevCursorOficinas.NOMUSU
          
          oficinas.pop()
        }
        
        hasPrevOficinas = false
      } else {
        if (cursor) {
          const prevCursorOficinas = oficinas[0]
          prevCursor = prevCursorOficinas.NOMUSU
          hasPrevOficinas = true
        } else {
          hasPrevOficinas = false
        }
        
        hasNextOficinas = false
      }
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      limit,
      oficinas: dir === 'next' ? oficinas : oficinas.sort((a,b) => a.DESOFI > b.DESOFI ? 1:-1),
      hasPrevOficinas,
      hasNextOficinas,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    res.render('admin/oficinas', { user, datos })
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
export const addPage = async (req, res) => {
  const user = req.user

  try {
    res.render('admin/oficinas/add', { user })
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
export const editPage = async (req, res) => {
  const user = req.user
  const oficina = {
    IDOFIC: req.params.id,
  }
  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficina`, {
      oficina,
    })
    const datos = {
      oficina: result.data.data,
      tiposRol,
    }

    res.render('admin/oficinas/edit', { user, datos })
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
export const insert = async (req, res) => {
  const user = req.user
  const oficina = {
    DESOFI: req.body.desofi.toUpperCase(),
    CODOFI: req.body.codofi.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearOficina,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas/insert`, {
      oficina,
      movimiento,
    })

    res.redirect('/admin/oficinas')
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
export const update = async (req, res) => {
  const user = req.user
  const oficina = {
    IDOFIC: req.body.idofic,
    DESOFI: req.body.desofi.toUpperCase(),
    CODOFI: req.body.codofi.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarOficina,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas/update`, {
      oficina,
      movimiento,
    })

    res.redirect('/admin/oficinas')
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
export const remove = async (req, res) => {
  const user = req.user
  const oficina = {
    IDOFIC: req.body.idofic,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarOficina,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas/delete`, {
      oficina,
      movimiento,
    })

    res.redirect('/admin/oficinas')
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
