import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  errorPage,
  perfilPage,
  changePassword,
  updatePerfil,
} from '../controllers/admin.controller'

const adminRouter = express.Router()

// paginas
adminRouter.get('/', authRoutes, mainPage)
adminRouter.get('/perfil/:userid', authRoutes, perfilPage)

// procedures
adminRouter.post('/cambio', authRoutes, changePassword)
adminRouter.post('/perfil', authRoutes, updatePerfil)

// error
adminRouter.post('/error400', errorPage)

export default adminRouter
