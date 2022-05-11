import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insertSubtipo,
  updateSubtipo,
  deleteSubtipo,
} from '../controllers/subtipo.controller'

const subtipoRouter = express.Router()

// paginas
subtipoRouter.get('/subtipos/:id/:des', authRoutes, mainPage)
subtipoRouter.get('/subtipos/add/tipo/:id', authRoutes, addPage)
subtipoRouter.get('/subtipos/edit/:id', authRoutes, editPage)

// procedures
subtipoRouter.post('/subtipos/insert', authRoutes, insertSubtipo)
subtipoRouter.post('/subtipos/update', authRoutes, updateSubtipo)
subtipoRouter.post('/subtipos/delete', authRoutes, deleteSubtipo)

export default subtipoRouter
