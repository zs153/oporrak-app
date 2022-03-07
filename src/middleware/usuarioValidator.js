import { validationResult } from 'express-validator'
import axios from 'axios'
import {
  arrTiposRol,
  arrTiposPerfil,
  arrEstadosUsuario,
} from '../public/js/enumeraciones'

export const validateInsert = async (req, res, next) => {
  const user = req.user
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  try {
    const result = await axios.get('http://localhost:8000/api/oficinas')

    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

    const alerts = errors.array()
    const datos = {
      usuario: req.body,
      arrTiposRol,
      arrTiposPerfil,
      arrEstadosUsuario,
      arrOficinas: result.data.dat,
    }

    res.render('admin/usuarios/add', { user, datos, alerts })
  } catch (error) {
    res.redirect('/admin/usuarios')
  }
}

export const validateUpdate = async (req, res, next) => {
  const user = req.user
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  try {
    const result = await axios.get('http://localhost:8000/api/oficinas')

    const extractedErrors = []
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

    const alerts = errors.array()
    const datos = {
      usuario: req.body,
      arrTiposRol,
      arrTiposPerfil,
      arrEstadosUsuario,
      arrOficinas: result.data.dat,
    }

    res.render('admin/usuarios/edit', { user, datos, alerts })
  } catch (error) {
    res.redirect('/admin/usuarios')
  }
}
