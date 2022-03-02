import { body, check, validationResult } from 'express-validator'
import axios from 'axios'
import {
  arrTiposRol,
  arrTiposPerfil,
  arrEstadosUsuario,
} from '../public/js/enumeraciones'

export const validationRules = () => {
  return [
    // body('userid')
    //   .trim()
    //   .isLength({ min: 4, max: 20 })
    //   .withMessage('La longitud de userID mínimo 4 y máximo 20'),
    // body('nomusu')
    //   .trim()
    //   .isLength({ min: 1, max: 255 })
    //   .withMessage('Introduzca nombre'),
    // body('emausu').isEmail().withMessage('Introduzca correo electrónico'),
    // body('telusu').notEmpty().withMessage('Introduzca teléfono'),
    check('telusu')
      .not()
      .isEmpty()
      .withMessage('El teléfono deberia tener mínimo 4 digitos'),
  ]
}

export const validate = async (req, res, next) => {
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
