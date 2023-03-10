import axios from 'axios'
import { scrypt } from 'crypto'
import {
  arrTiposRol,
  arrTiposPerfil,
  arrEstadosUsuario,
  estadosUsuario,
  tiposMovimiento,
  tiposRol,
} from '../public/js/enumeraciones'
import { serverAPI, puertoAPI, secreto } from '../config/settings'

export const mainPage = async (req, res) => {
  const user = req.user
  //const context = user.rol === tiposRol.admin ? {} : { OFIUSU: user.oficina }

  let context = ''
  let hasPrevUsers = false
  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  const limit = req.query.limit ? req.query.limit : 10
  const dir = req.query.dir ? req.query.dir : 'next'

  if (cursor) {
    hasPrevUsers = true
    context = {
      limit: limit + 1,
      direction: dir,
      cursor,
    }
  } else {
    hasPrevUsers = false
    context = {
      limit: limit + 1,
      direction: 'next',
      cursor: {
        next: 0,
        prev: null
      },
    }
  }

  try {
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      context,
    })

    const hasNextUsers = usuarios.data.data.length === limit +1
    let nextCursor = 0
    let prevCursor = null

    if (hasNextUsers) {
      const nextCursorUser = usuarios.data.data[limit -1]
      const prevCursorUser = usuarios.data.data[0]
      nextCursor = nextCursorUser.IDUSUA
      prevCursor = prevCursorUser.IDUSUA
      usuarios.data.data.pop()
    }

    const cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      limit,
      usuarios: usuarios.data.data,
      hasNextUsers,
      hasPrevUsers,
      cursor,
      estadosUsuario,
    }

    console.log('cursor', cursor)
    res.render('admin/usuarios', { user, datos })
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
  const filteredRol = arrTiposRol.filter(itm => itm.id <= user.rol)
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: user.oficina }

  try {
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    const datos = {
      oficinas: oficinas.data.data,
      filteredRol,
      arrTiposPerfil,
      arrEstadosUsuario,
    }

    res.render('admin/usuarios/add', { user, datos })
  } catch (error) {
    if (error.response.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.msg }],
      });
    }
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const filteredRol = arrTiposRol.filter(itm => itm.id <= user.rol)
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: user.oficina }
  const context = {
    IDUSUA: req.params.id,
  } 

  try {
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context,
    })
    const datos = {
      usuario: usuario.data.data,
      oficinas: oficinas.data.data,
      filteredRol,
      arrTiposPerfil,
      arrEstadosUsuario,
    }

    res.render('admin/usuarios/edit', { user, datos })
  } catch (error) {
    if (error.response.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.msg }],
      });
    }
  }
}

// proc
export const insert = async (req, res) => {
  const user = req.user
  const seed = Math.random().toString(36).substring(2, 10);

  try {
    await hash(seed).then(async (pass) => {
      const usuario = {
        NOMUSU: req.body.nomusu.toUpperCase(),
        OFIUSU: req.body.ofiusu,
        ROLUSU: req.body.rolusu,
        USERID: req.body.userid.toLowerCase(),
        EMAUSU: req.body.emausu,
        PERUSU: req.body.perusu,
        TELUSU: req.body.telusu,
        STAUSU: req.body.stausu,
      }
      const recurso = {
        PWDUSU: pass,
        SEED: seed,
      }
      const movimiento = {
        USUMOV: user.id,
        TIPMOV: tiposMovimiento.crearUsuario,
      }

      await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/insert`, {
        usuario,
        recurso,
        movimiento,
      })

      res.redirect('/admin/usuarios')
    }).catch(err => {
      throw err
    })
  } catch (error) {
    if (error.response.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.data }],
      });
    }
  }
}
export const update = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
    NOMUSU: req.body.nomusu.toUpperCase(),
    OFIUSU: req.body.ofiusu,
    ROLUSU: req.body.rolusu,
    EMAUSU: req.body.emausu,
    PERUSU: req.body.perusu,
    TELUSU: req.body.telusu,
    STAUSU: req.body.stausu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarUsuario,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/update`, {
      usuario,
      movimiento,
    })

    res.redirect('/admin/usuarios')
  } catch (error) {
    if (error.response.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.msg }],
      });
    }
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: req.body.idusua,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuario,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/delete`, {
      usuario,
      movimiento,
    })

    res.redirect('/admin/usuarios')
  } catch (error) {
    if (error.response.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.msg }],
      });
    }
  }
}

// helpers
const hash = async (password) => {
  return new Promise((resolve, reject) => {
    scrypt(password, secreto, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('base64'))
    });
  })
}
