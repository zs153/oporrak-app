import axios from "axios";
import {
  origenTipo,
  arrOrigenTipo,
  tiposMovimiento,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get("http://localhost:8000/api/subtipos");

    res.render("admin/subtipos", { user, subtipos: result.data.dat });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const subtipo = {
    idsubt: 0,
    dessub: "",
    idtipo: 0,
  };

  try {
    const resultTipos = await axios.get("http://localhost:8000/api/tipos");
    const datos = {
      subtipo,
      arrTipos: resultTipos.data.dat,
    };

    res.render("admin/subtipos/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const resultTipos = await axios.get("http://localhost:8000/api/tipos");
    const result = await axios.post("http://localhost:8000/api/subtipo", {
      idsubt: req.params.id,
    });

    const subtipo = {
      idsubt: result.data.idsubt,
      dessub: result.data.dessub,
      idtipo: result.data.idtipo,
      idtold: result.data.idtipo,
    };
    const datos = {
      subtipo,
      arrTipos: resultTipos.data.dat,
    };

    res.render("admin/subtipos/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const insertSubtipo = async (req, res) => {
  const user = req.user;
  const subtipo = {
    dessub: req.body.dessub,
    idtipo: req.body.idtipo,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearSubtipo,
  };

  try {
    await axios.post("http://localhost:8000/api/subtipos/insert", {
      subtipo,
      movimiento,
    });

    res.redirect("/admin/subtipos");
  } catch (error) {
    let msg = "No se ha podido crear el subtipo.";

    if (error.response.data.errorNum === 20100) {
      msg = "El subtipo ya existe.";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const updateSubtipo = async (req, res) => {
  const user = req.user;
  const subtipo = {
    idsubt: req.body.idsubt,
    dessub: req.body.dessub,
    idtold: req.body.idtold,
    idtipo: req.body.idtipo,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarSubtipo,
  };

  try {
    await axios.post("http://localhost:8000/api/subtipos/update", {
      subtipo,
      movimiento,
    });

    res.redirect("/admin/subtipos");
  } catch (error) {
    let msg =
      "No se han podido modificar los datos del subtipo. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El subtipo ya existe";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const deleteSubtipo = async (req, res) => {
  const user = req.user;
  const subtipo = {
    idsubt: req.body.idsubt,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarSubtipo,
  };

  try {
    await axios.post("http://localhost:8000/api/subtipos/delete", {
      subtipo,
      movimiento,
    });

    res.redirect("/admin/subtipos");
  } catch (error) {
    const msg = "No se ha podido elminar el subtipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
