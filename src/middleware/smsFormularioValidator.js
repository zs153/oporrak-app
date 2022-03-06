import { validationResult } from 'express-validator'

export const validateSms = async (req, res, next) => {
  const user = req.user
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  const alerts = errors.array()
  res.redirect('/admin/formularios')
}
