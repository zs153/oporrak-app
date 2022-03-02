import { body, check, validationResult } from 'express-validator'

const validationRules = () => {
  return [
    body('userid')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('La longitud de userID mínimo 4 y máximo 20'),
    body('nomusu')
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage('Introduzca nombre'),
    body('emausu').isEmail().withMessage('Introduzca correo electrónico'),
  ]
}

const validate = (req, res, next) => {
  const username = req.username
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  const alerts = errors.array()
  res.render('log/sign-up', { datos: req.body, alerts: alerts })
}

module.exports = {
  validationRules,
  validate,
}
