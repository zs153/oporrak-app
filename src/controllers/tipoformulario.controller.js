import axios from "axios";
import { tiposMovimiento } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post(
      "http://localhost:8000/api/tipos/formularios"
    );
    const datos = {
      tipos: result.data,
    };

    res.render("admin/tipos/formularios", { user, datos });
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
    ayutip: 0,
  };

  try {
    const datos = {
      tipo,
    };

    res.render("admin/tipos/formularios/add", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const editPage = async (req, res) => {
  const user = req.user;
  let tipo = {
    idtipo: req.params.id,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/tipos/formulario",
      {
        tipo,
      }
    );

    tipo = {
      idtipo: result.data.IDTIPO,
      destip: result.data.DESTIP,
      ayutip: result.data.AYUTIP,
    };
    const datos = {
      tipo,
    };

    res.render("admin/tipos/formularios/edit", { user, datos });
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
    ayutip: req.body.ayutip,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearTipoFormulario,
  };

  try {
    await axios.post("http://localhost:8000/api/tipos/formularios/insert", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/formularios`);
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
    ayutip: req.body.ayutip,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarTipoFormulario,
  };

  try {
    axios.post("http://localhost:8000/api/tipos/formularios/update", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/formularios`);
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
    tipmov: tiposMovimiento.borrarTipoFormulario,
  };

  try {
    await axios.post("http://localhost:8000/api/tipos/formularios/delete", {
      tipo,
      movimiento,
    });

    res.redirect(`/admin/tipos/formularios`);
  } catch (error) {
    const msg = "No se ha podido elminar el tipo.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
