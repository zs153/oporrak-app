import axios from "axios";
import {
  origenTipo,
  arrOrigenTipo,
  tiposMovimiento,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;
  const tipo = {
    orgtip: req.params.org ? req.params.org : origenTipo.formulario,
  };
  const verTodo = false;

  try {
    const result = await axios.post("http://localhost:8000/api/tipos", {
      tipo,
    });
    const datos = {
      documentos: result.data,
      tipo,
      origenTipo,
      arrOrigenTipo,
    };

    res.render("admin/tipos", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const tipo = {
    idtipo: 0,
    destip: "",
    ayutip: "",
    orgtip: req.params.org,
  };
  const origen = arrOrigenTipo.find((o) => o.id === parseInt(tipo.orgtip));

  try {
    const datos = {
      tipo,
      origen,
      origenTipo,
    };

    res.render("admin/tipos/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const editPage = async (req, res) => {
  const user = req.user;
  const tipo = {
    idtipo: req.params.id,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/tipo", {
      tipo,
    });

    const documento = {
      idtipo: result.data.IDTIPO,
      destip: result.data.DESTIP,
      ayutip: result.data.AYUTIP,
      orgtip: result.data.ORGTIP,
    };
    const datos = {
      documento,
      arrOrigenTipo,
      origenTipo,
    };

    res.render("admin/tipos/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    usumov: user.id,
    tipmov: tiposMovimiento.crearTipo,
  };

  try {
    await axios.post("http://localhost:8000/api/tipos/insert", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/${tipo.orgtip}`);
  } catch (error) {
    let msg = "No se ha podido crear el tipo.";

    if (error.response.data.errorNum === 20100) {
      msg = "El tipo ya existe.";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
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
    usumov: user.id,
    tipmov: tiposMovimiento.modificarTipo,
  };

  try {
    axios.post("http://localhost:8000/api/tipos/update", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/${tipo.orgtip}`);
  } catch (error) {
    let msg =
      "No se ha podido actualizar el tipo. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El tipo ya existe";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const deleteTipo = async (req, res) => {
  const user = req.user;
  const tipo = {
    idtipo: req.body.idtipo,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarTipo,
  };

  try {
    await axios.post("http://localhost:8000/api/tipos/delete", {
      tipo,
      movimiento,
    });

    res.redirect("/admin/tipos");
  } catch (error) {
    const msg = "No se ha podido elminar el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
