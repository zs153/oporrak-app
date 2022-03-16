import express from 'express'
import {
  loginPage,
  verifyLogin,
  verifyLogout,
  forgotPage,
  forgotPassword,
  registroPage,
  crearRegistro,
} from '../controllers/login.controller'

const loginRouter = express.Router()

// auth
loginRouter.get('/login', loginPage)
loginRouter.get('/logout', verifyLogout)
loginRouter.get('/forgot', forgotPage)
loginRouter.get('/registro', registroPage)
loginRouter.post('/login', verifyLogin)
loginRouter.post('/forgot', forgotPassword)
loginRouter.post('/registro', crearRegistro)

export default loginRouter
