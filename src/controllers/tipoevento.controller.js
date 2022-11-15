import axios from "axios";
import { tiposRol, tiposMovimiento } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8200/api/tipos/eventos");
    const datos = {
      tipos: JSON.stringify(result.data),
      tiposRol,
    };

    res.render("admin/tipos/eventos", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const datos = {
    tiposRol,
  }
  try {
    res.render("admin/tipos/eventos/add", { user, datos });
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
    const result = await axios.post("http://localhost:8200/api/tipos/evento", {
      tipo,
    });
    const datos = {
      tipo: result.data,
      tiposRol,
    };

    res.render("admin/tipos/eventos/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

export const insert = async (req, res) => {
  const user = req.user;
  const tipo = {
    destip: req.body.destip.toUpperCase(),
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearTipoEvento,
  };

  try {
    await axios.post("http://localhost:8200/api/tipos/eventos/insert", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/eventos`);
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
export const update = async (req, res) => {
  const user = req.user;
  const tipo = {
    idtipo: req.body.idtipo,
    destip: req.body.destip.toUpperCase(),
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarTipoEvento,
  };

  try {
    axios.post("http://localhost:8200/api/tipos/eventos/update", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/eventos`);
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
export const remove = async (req, res) => {
  const user = req.user;
  const tipo = {
    idtipo: req.body.idtipo,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.borrarTipoEvento,
  };

  try {
    await axios.post("http://localhost:8200/api/tipos/eventos/delete", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/eventos`);
  } catch (error) {
    const msg = "No se ha podido elminar el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
