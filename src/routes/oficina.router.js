import express from 'express'
import authRoutes, { verifyTokenAndAdmin } from '../middleware/auth'
import { validationRules, validate } from '../middleware/oficinaValidator'
import {
  mainPage,
  addPage,
  editPage,
  insertOficina,
  updateOficina,
  deleteOficina,
} from '../controllers/oficina.controller'

const oficinaRouter = express.Router()

// paginas
oficinaRouter.get('/oficinas', verifyTokenAndAdmin, mainPage)
oficinaRouter.get('/oficinas/add', verifyTokenAndAdmin, addPage)
oficinaRouter.get('/oficinas/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
oficinaRouter.post(
  '/oficinas/insert',
  verifyTokenAndAdmin,
  validationRules(),
  validate,
  insertOficina
)
oficinaRouter.post(
  '/oficinas/update',
  verifyTokenAndAdmin,
  validationRules(),
  validate,
  updateOficina
)
oficinaRouter.post('/oficinas/delete', verifyTokenAndAdmin, deleteOficina)

export default oficinaRouter
