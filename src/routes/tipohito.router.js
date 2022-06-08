import express from 'express'
import {verifyTokenAndAdmin} from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/tipohito.controller'

const tipoHitoRouter = express.Router()

// paginas
tipoHitoRouter.get('/tipos/hitos', verifyTokenAndAdmin, mainPage)
tipoHitoRouter.get('/tipos/hitos/add', verifyTokenAndAdmin, addPage)
tipoHitoRouter.get('/tipos/hitos/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
tipoHitoRouter.post('/tipos/hitos/insert', verifyTokenAndAdmin, insert)
tipoHitoRouter.post('/tipos/hitos/update', verifyTokenAndAdmin, update)
tipoHitoRouter.post('/tipos/hitos/delete', verifyTokenAndAdmin, remove)

export default tipoHitoRouter