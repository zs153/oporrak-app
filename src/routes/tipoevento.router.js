import express from 'express'
import {verifyTokenAndAdmin} from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/tipoevento.controller'

const tipoEventoRouter = express.Router()

// paginas
tipoEventoRouter.get('/tipos/eventos', verifyTokenAndAdmin, mainPage)
tipoEventoRouter.get('/tipos/eventos/add', verifyTokenAndAdmin, addPage)
tipoEventoRouter.get('/tipos/eventos/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
tipoEventoRouter.post('/tipos/eventos/insert', verifyTokenAndAdmin, insert)
tipoEventoRouter.post('/tipos/eventos/update', verifyTokenAndAdmin, update)
tipoEventoRouter.post('/tipos/eventos/delete', verifyTokenAndAdmin, remove)

export default tipoEventoRouter
