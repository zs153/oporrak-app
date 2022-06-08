import express from 'express'
import {verifyTokenAndAdmin} from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/tipofraude.controller'

const tipoFraudeRouter = express.Router()

// paginas
tipoFraudeRouter.get('/tipos/fraudes', verifyTokenAndAdmin, mainPage)
tipoFraudeRouter.get('/tipos/fraudes/add', verifyTokenAndAdmin, addPage)
tipoFraudeRouter.get('/tipos/fraudes/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
tipoFraudeRouter.post('/tipos/fraudes/insert', verifyTokenAndAdmin, insert)
tipoFraudeRouter.post('/tipos/fraudes/update', verifyTokenAndAdmin, update)
tipoFraudeRouter.post('/tipos/fraudes/delete', verifyTokenAndAdmin, remove)

export default tipoFraudeRouter
