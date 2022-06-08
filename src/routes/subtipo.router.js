import express from 'express'
import {verifyTokenAndAdmin} from "../middleware/auth";
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
subtipoRouter.get('/subtipos', verifyTokenAndAdmin, mainPage)
subtipoRouter.get('/subtipos/add', verifyTokenAndAdmin, addPage)
subtipoRouter.get('/subtipos/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
subtipoRouter.post('/subtipos/insert', verifyTokenAndAdmin, insert)
subtipoRouter.post('/subtipos/update', verifyTokenAndAdmin, update)
subtipoRouter.post('/subtipos/delete', verifyTokenAndAdmin, remove)

export default subtipoRouter