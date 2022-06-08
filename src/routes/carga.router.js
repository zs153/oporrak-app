import express from 'express'
import {verifyTokenAndAdmin} from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/carga.controller'

const cargaRouter = express.Router()

// paginas
cargaRouter.get('/cargas', verifyTokenAndAdmin, mainPage)
cargaRouter.get('/cargas/add', verifyTokenAndAdmin, addPage)
cargaRouter.get('/cargas/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
cargaRouter.post('/cargas/insert', verifyTokenAndAdmin, insert)
cargaRouter.post('/cargas/update', verifyTokenAndAdmin, update)
cargaRouter.post('/cargas/delete', verifyTokenAndAdmin, remove)

export default cargaRouter