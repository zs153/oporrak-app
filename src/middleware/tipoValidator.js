import { validationResult } from "express-validator";
import { arrOrigenTipo } from "../public/js/enumeraciones";

export const validateInsert = async (req, res, next) => {
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
    arrOrigenTipo,
  };
  res.render("admin/tipos/add", { user, datos, alerts });
};
export const validateUpdate = async (req, res, next) => {
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
    arrOrigenTipo,
  };

  res.render("admin/tipos/edit", { user, datos, alerts });
};
