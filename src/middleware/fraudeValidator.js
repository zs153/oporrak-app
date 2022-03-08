import axios from "axios";
import { validationResult } from "express-validator";

export const validateInsert = async (req, res, next) => {
  const user = req.user;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  const alerts = errors.array();

  next();
};

export const validateUpdate = async (req, res, next) => {
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
      idfrau: req.body.idfrau,
      fecfra: new Date(req.body.fecfra).toISOString().substring(0, 10),
      nifcon: req.body.nifcon,
      nomcon: req.body.nomcon,
      emacon: req.body.emacon,
      telcon: req.body.telcon,
      movcon: req.body.movcon,
      reffra: req.body.reffra,
      tipfra: req.body.tipfra,
      ejefra: req.body.ejefra,
      ofifra: req.body.ofifra,
      obsfra: req.body.obsfra,
      funfra: req.body.funfra,
      liqfra: req.body.liqfra,
    };

    const datos = {
      documento,
      arrTipos,
      arrOficinas,
    };
    res.render("admin/fraudes/edit", { user, datos, alerts });
  } catch (error) {
    res.redirect("/admin/fraudes");
  }
};
