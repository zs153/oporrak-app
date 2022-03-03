import axios from "axios";
import { body, validationResult, check } from "express-validator";

export const validateInsert = async (req, res, next) => {
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
      fecdoc: new Date(req.body.fecdoc).toISOString().substring(0, 10),
      nifcon: req.body.nifcon,
      nomcon: req.body.nomcon,
      telcon: req.body.telcon,
      emacon: req.body.emacon,
      movcon: req.body.movcon,
      refdoc: req.body.refdoc,
      tipdoc: req.body.tipdoc,
      ejedoc: req.body.ejedoc,
      ofidoc: req.body.ofidoc,
      obsdoc: req.body.obsdoc,
      bosdoc: req.body.obsdoc,
      fundoc: req.body.fundoc,
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
      iddocu: req.body.iddocu,
      fecdoc: new Date(req.body.fecdoc).toISOString().substring(0, 10),
      nifcon: req.body.nifcon,
      nomcon: req.body.nomcon,
      emacon: req.body.emacon,
      telcon: req.body.telcon,
      movcon: req.body.movcon,
      refdoc: req.body.refdoc,
      tipdoc: req.body.tipdoc,
      ejedoc: req.body.ejedoc,
      ofidoc: req.body.ofidoc,
      obsdoc: req.body.obsdoc,
      bosdoc: req.body.obsdoc,
      fundoc: req.body.fundoc,
      liqdoc: req.body.liqdoc,
    };
    const datos = {
      documento,
      arrTipos,
      arrOficinas,
    };
    res.render("admin/formularios/edit", { user, datos, alerts });
  } catch (error) {
    res.redirect("/admin/formularios");
  }
};
