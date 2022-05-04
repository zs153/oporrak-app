import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insertSms,
  updateSms,
  deleteSms,
  verTodo,
} from '../controllers/sms.controller'

const smsRouter = express.Router()

// paginas
smsRouter.get('/smss', authRoutes, mainPage)
smsRouter.get('/smss/add', authRoutes, addPage)
smsRouter.get('/smss/edit/:id', authRoutes, editPage)

// procedures
smsRouter.post('/smss/insert', authRoutes, insertSms)
smsRouter.post('/smss/update', authRoutes, updateSms)
smsRouter.post('/smss/delete', authRoutes, deleteSms)
smsRouter.get('/smss/vertodo', authRoutes, verTodo)

export default smsRouter
