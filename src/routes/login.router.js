import express from 'express'
import { check } from 'express-validator'
import {
  loginPage,
  verifyLogin,
  verifyLogout,
  forgotPage,
  forgotPassword,
  registroPage,
  crearRegistro,
} from '../controllers/login.controller'
import { validate } from '../middleware/registroValidator'

const loginRouter = express.Router()

// auth
loginRouter.get('/login', loginPage)
loginRouter.post('/login', verifyLogin)
loginRouter.get('/logout', verifyLogout)
loginRouter.get('/forgot', forgotPage)
loginRouter.post('/forgot', forgotPassword)
loginRouter.get('/registro', registroPage)
loginRouter.post(
  '/registro',
  [
    check('userid')
      .not()
      .isEmpty()
      .withMessage('Debe introducir userid')
      .isLength({ min: 4, max: 20 })
      .withMessage('La longitud de userID es mínimo 4 y máximo 20'),
    check('nomusu')
      .not()
      .isEmpty()
      .withMessage('Debe introducir nombre')
      .isLength({ min: 1, max: 250 })
      .withMessage('Longitud máxima del nombre es de 250 caracteres'),
    check('emausu')
      .isEmail()
      .withMessage('Debe introducir un correo electrónico'),
  ],
  validate,
  crearRegistro
)

export default loginRouter
