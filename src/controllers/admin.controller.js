import axios from 'axios'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {
  arrTiposRol,
  arrTiposPerfil,
  tiposMovimiento,
} from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  res.render('admin', { user })
}
export const perfilPage = async (req, res) => {
  const user = req.user
  const usuario = {
    userid: user.userID,
  }
  try {
    const result = await axios.post('http://localhost:8100/api/usuario', {
      usuario,
    })

    const datos = {
      usuario: result.data,
      arrTiposRol,
      arrTiposPerfil,
    }

    res.render('admin/perfil', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const errorPage = async (req, res) => {
  res.render('admin/error400')
}
export const changePassword = async (req, res) => {
  const user = req.user
  const salt = await bcrypt.genSalt(10)
  const passHash = await bcrypt.hash(req.body.pwdusu, salt)
  const usuario = {
    idusua: req.body.idusua,
    pwdusu: passHash,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.cambioPassword,
  }

  try {
    const result = await axios.post(
      'http://localhost:8100/api/usuarios/cambio',
      {
        usuario,
        movimiento,
      }
    )

    res.redirect('/log/logout')
  } catch (error) {
    res.redirect('/admin')
  }
}
export const updatePerfil = async (req, res) => {
  const user = req.user
  const usuario = {
    idusua: user.id,
    nomusu: req.body.nomusu.toUpperCase(),
    ofiusu: req.body.ofiusu,
    emausu: req.body.emausu,
    telusu: req.body.telusu,
  }
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarPerfil,
  }

  try {
    const result = await axios.post(
      'http://localhost:8100/api/usuarios/perfil',
      {
        usuario,
        movimiento,
      }
    )

    const accessToken = jwt.sign(
      {
        id: user.id,
        nombre: usuario.nomusu,
        userID: user.userID,
        email: usuario.emausu,
        rol: user.rol,
        oficina: usuario.ofiusu,
        telefono: usuario.telusu,
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: '8h' }
    )
    const options = {
      path: '/',
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
      httpOnly: true,
    }

    res.cookie('auth', accessToken, options)
    res.redirect('/log/logout')
  } catch (error) {
    res.redirect('/admin')
  }
}
