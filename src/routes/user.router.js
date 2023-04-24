import express from 'express'
import authRoutes from '../middleware/auth'
import {
  changePassword,
  logoutPage,
  mainPage, perfilPage, updatePerfil,
} from '../controllers/user.controller'

const userRouter = express.Router()

// paginas
userRouter.get('/', authRoutes, mainPage)
userRouter.get('/perfil/:userid', authRoutes, perfilPage)
userRouter.get("/logout", logoutPage)

// proc
userRouter.post('/cambio', authRoutes, changePassword)
userRouter.post('/perfil', authRoutes, updatePerfil)

export default userRouter