import { check, validationResult } from 'express-validator'

const validateConfirmPassword = () => {
  return [
    check('pwdusu')
    .isLength({ min: 4, max: 64})
    .withMessage('La longitud de la contraseña debe estar entre 4-64 caracteres.'),
    // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
    // .withMessage('La contaseña debe incluir una letra en minúscula, una en mayúscula, un número y un caracter espacial como mínimo.'),
    check('pwdusu2').custom((value, { req }) => {
      if (value !== req.body.pwdusu) {
        throw new Error("La contraseña no coincide.");
      }
      return true;      
    })
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  const alerts = errors.array()
  res.render('admin/usuarios/change', { alerts: alerts })
}

module.exports = {
  validateConfirmPassword,
  validate,
}
