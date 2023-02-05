import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  perfilPage,
  changePassword,
  updatePerfil,
  cleanPage,
  delRecurso,
  newRecurso,
} from '../controllers/admin.controller'

const adminRouter = express.Router()

// paginas
adminRouter.get('/', authRoutes, mainPage)
adminRouter.get('/perfil/:userid', authRoutes, perfilPage)
adminRouter.get('/clean', authRoutes, cleanPage)
adminRouter.get('/new', authRoutes, newRecurso)
adminRouter.get('/del', authRoutes, delRecurso)

// procedures
adminRouter.post('/cambio', authRoutes, changePassword)
adminRouter.post('/perfil', authRoutes, updatePerfil)

export default adminRouter
