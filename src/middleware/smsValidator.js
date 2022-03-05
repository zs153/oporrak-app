import { validationResult } from 'express-validator'
import { arrEstadosSms } from '../public/js/enumeraciones'

export const validateInsert = async (req, res, next) => {
  const user = req.user
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  const alerts = errors.array()
  const datos = {
    sms: req.body,
    arrEstadosSms,
  }
  res.render('admin/smss/add', { user, datos, alerts })
}
export const validateUpdate = async (req, res, next) => {
  const user = req.user
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  const alerts = errors.array()
  const datos = {
    sms: req.body,
    arrEstadosSms,
  }
  res.render('admin/smss/edit', { user, datos, alerts })
}
