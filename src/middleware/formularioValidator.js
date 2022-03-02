import axios from "axios";
import { body, validationResult, check } from "express-validator";

export const validationRules = () => {
  return [
    body("nifcon")
      .trim()
      .isLength({ min: 9, max: 11 })
      .withMessage("La longitud NIF mínimo 9 y máximo 11 caracteres"),
    body("nomcon")
      .trim()
      .isLength({ min: 1, max: 255 })
      .withMessage("Introduzca nombre"),
    body("teldec")
      .isLength({ min: 1, max: 20 })
      .withMessage("Introduzca un teléfono"),
    body("ejedoc")
      .isLength({ min: 4, max: 4 })
      .withMessage("Introduzca ejercicio 4 dígitos"),
    check("fecdoc").isISO8601().toDate(),
  ];
};

export const validate = async (req, res, next) => {
  const user = req.user;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  try {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    // tipos
    const resultTipos = await axios.get("http://localhost:8000/api/tipos");
    const arrTipos = resultTipos.data.dat;

    const alerts = errors.array();

    // oficinas
    const resultOficinas = await axios.get(
      "http://localhost:8000/api/oficinas"
    );
    const arrOficinas = resultOficinas.data.dat;

    const documento = {
      fecha: new Date(req.body.fecdoc).toISOString().substring(0, 10),
      nif: req.body.nifcon,
      nombre: req.body.nomcon,
      referencia: req.body.refdoc,
      tipo: req.body.tipdoc,
      ejercicio: req.body.ejedoc,
      oficina: req.body.ofidoc,
      observaciones: req.body.obsdoc,
      telefonoDeclarante: req.body.teldec,
      telefonoRepresentante: req.body.telrep,
      funcionario: req.body.fundoc,
      observaciones: req.body.obsdoc,
    };

    const datos = {
      documento,
      arrTipos,
      arrOficinas,
    };
    res.render("admin/formularios/add", { user, datos, alerts });
  } catch (error) {
    res.redirect("/admin/formularios");
  }
};
