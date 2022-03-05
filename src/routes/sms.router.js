import express from 'express'
import { verifyTokenAndAdmin } from '../middleware/auth'
import { validateInsert, validateUpdate } from '../middleware/smsValidator'
import {
  mainPage,
  addPage,
  editPage,
  insertSms,
  updateSms,
  deleteSms,
} from '../controllers/sms.controller'
import { check } from 'express-validator'

const smsRouter = express.Router()

// paginas
smsRouter.get('/smss', verifyTokenAndAdmin, mainPage)
smsRouter.get('/smss/add', verifyTokenAndAdmin, addPage)
smsRouter.get('/smss/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
smsRouter.post(
  '/smss/insert',
  verifyTokenAndAdmin,
  [
    check('texsms')
      .not()
      .isEmpty()
      .withMessage('Debe introducir el texto sms')
      .isLength({ min: 1, max: 140 })
      .withMessage('La longitud del texto mínimo 1 y máximo 140 caracteres'),
    check('movsms')
      .isLength({ min: 9, max: 9 })
      .withMessage('El número de movil debe de tener 9 dígitos')
      .matches(/^([6]{1})([0-9]{8})|(7[1-4]{1})([0-9]{7})$/)
      .withMessage('Introduzca un número de movil válido'),
  ],
  validateInsert,
  insertSms
)
smsRouter.post(
  '/smss/update',
  verifyTokenAndAdmin,
  [
    check('texsms')
      .not()
      .isEmpty()
      .withMessage('Debe introducir el texto sms')
      .isLength({ min: 1, max: 140 })
      .withMessage('La longitud del texto mínimo 1 y máximo 140 caracteres'),
    check('movsms')
      .isLength({ min: 9, max: 9 })
      .withMessage('El número de movil debe de tener 9 dígitos')
      .matches(/^([6]{1})([0-9]{8})|(7[1-4]{1})([0-9]{7})$/)
      .withMessage('Introduzca un número de movil válido'),
  ],
  validateUpdate,
  updateSms
)
smsRouter.post('/smss/delete', verifyTokenAndAdmin, deleteSms)

export default smsRouter
