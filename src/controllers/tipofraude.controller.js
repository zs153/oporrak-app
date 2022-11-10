import axios from "axios";
import { tiposMovimiento } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8200/api/tipos/fraudes");
    const datos = {
      tipos: JSON.stringify(result.data),
    };

    res.render("admin/tipos/fraudes", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  try {
    res.render("admin/tipos/fraudes/add", { user });
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
    const result = await axios.post("http://localhost:8200/api/tipos/fraude", {
      tipo,
    });
    const datos = {
      tipo: result.data,
    };

    res.render("admin/tipos/fraudes/edit", { user, datos });
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
    tipmov: tiposMovimiento.crearTipoFraude,
  };

  try {
    await axios.post("http://localhost:8200/api/tipos/fraudes/insert", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/fraudes`);
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
    tipmov: tiposMovimiento.modificarTipoFraude,
  };

  try {
    axios.post("http://localhost:8200/api/tipos/fraudes/update", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/fraudes`);
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
    tipmov: tiposMovimiento.borrarTipoFraude,
  };

  try {
    await axios.post("http://localhost:8200/api/tipos/fraudes/delete", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/fraudes`);
  } catch (error) {
    const msg = "No se ha podido elminar el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
