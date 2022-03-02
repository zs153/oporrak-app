import { body, validationResult } from "express-validator";

export const validationRules = () => {
  return [
    body("destip")
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage("La longitud de la descripción; mínimo 1 y máximo 255"),
    body("ayutip")
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage("La longitud del texto de ayuda mínimo 1 y máximo 4000"),
  ];
};

export const validate = async (req, res, next) => {
  const user = req.user;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  const alerts = errors.array();
  const datos = {
    tipo: req.body,
  };
  res.render("admin/tipos/add", { user, datos, alerts });
};
