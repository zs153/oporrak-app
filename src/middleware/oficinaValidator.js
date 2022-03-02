import { body, validationResult } from "express-validator";

export const validationRules = () => {
  return [
    body("desofi")
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage("La longitud de la descripción; mínimo 1 y máximo 255"),
    body("codofi")
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage("La longitud del código; mínimo 1 y máximo 255"),
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
    oficina: req.body,
  };
  res.render("admin/oficinas/add", { user, datos, alerts });
};
