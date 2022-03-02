import { body, validationResult } from "express-validator";

export const validationRulesSms = () => {
  return [
    body("texsms")
      .isLength({ min: 1, max: 140 })
      .withMessage("La longitud del texto mínimo 1 y máximo 140"),
    body("movsms")
      .trim()
      .isLength({ min: 9, max: 9 })
      .withMessage("Introduzca un número de movil válido"),
  ];
};

export const validateSms = async (req, res, next) => {
  const user = req.user;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  const alerts = errors.array();
  const datos = {
    sms: req.body,
  };
  res.render("admin/formularios/sms", { user, datos, alerts });
};
