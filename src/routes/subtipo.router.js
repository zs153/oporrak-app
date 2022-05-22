import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/subtipo.controller'

const subtipoRouter = express.Router()

// paginas
subtipoRouter.get('/subtipos', authRoutes, mainPage)
subtipoRouter.get('/subtipos/add', authRoutes, addPage)
subtipoRouter.get('/subtipos/edit/:id', authRoutes, editPage)

// procedures
subtipoRouter.post('/subtipos/insert', authRoutes, insert)
subtipoRouter.post('/subtipos/update', authRoutes, update)
subtipoRouter.post('/subtipos/delete', authRoutes, remove)

export default subtipoRouter