import axios from "axios";
import {
  origenTipo,
  arrOrigenTipo,
  tiposMovimiento,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get("http://localhost:8000/api/tipos");

    const datos = { tipos: result.data.dat, arrOrigenTipo };

    res.render("admin/tipos", { user, datos });
  } catch (error) {
    res.redirect("/");
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const tipo = {
    idtipo: 0,
    destip: "",
    ayutip: "",
    orgtip: origenTipo.formulario,
  };

  try {
    const datos = {
      tipo,
      arrOrigenTipo,
    };

    res.render("admin/tipos/add", { user, datos });
  } catch (error) {
    res.redirect("/admin/tipos");
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8000/api/tipo", {
      id: req.params.id,
    });

    const tipo = {
      idtipo: result.data.idtipo,
      destip: result.data.destip,
      ayutip: result.data.ayutip,
      orgtip: result.data.orgtip,
    };
    const datos = {
      tipo,
      arrOrigenTipo,
    };

    res.render("admin/tipos/edit", { user, datos });
  } catch (error) {
    res.redirect("/admin/tipos");
  }
};
export const insertTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    destip: req.body.destip,
    ayutip: req.body.ayutip,
    orgtip: req.body.orgtip,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearTipo,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/tipos/insert", {
      tipo,
      movimiento,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    let msg = "No se ha podido crear el tipo. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El tipo ya existe.";
    }
    try {
      const datos = {
        tipo: req.body,
        arrOrigenTipo,
      };

      res.render("admin/tipos/add", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/tipos");
    }
  }
};
export const updateTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    idtipo: req.body.idtipo,
    destip: req.body.destip,
    ayutip: req.body.ayutip,
    orgtip: req.body.orgtip,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarTipo,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/tipos/update", {
      tipo,
      movimiento,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    let msg =
      "No se ha podido actualizar el tipo. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El tipo ya existe";
    }
    try {
      const datos = {
        tipo: req.body,
        arrOrigenTipo,
      };

      res.render("admin/tipos/edit", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/tipos");
    }
  }
};
export const deleteTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    idtipo: req.body.idtipo,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarTipo,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/tipos/delete", {
      tipo,
      movimiento,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    res.redirect("/admin/tipos");
  }
};
