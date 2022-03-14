import axios from "axios";
import { tiposMovimiento } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get("http://localhost:8000/api/oficinas");

    res.render("admin/oficinas", { user, oficinas: result.data.dat });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const oficina = {
    idofic: 0,
    desofi: "",
    codofi: "",
  };

  try {
    const datos = {
      oficina,
    };

    res.render("admin/oficinas/add", { user, datos });
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
    const result = await axios.post("http://localhost:8000/api/oficina", {
      idofic: req.params.id,
    });

    const oficina = {
      idofic: result.data.idofic,
      desofi: result.data.desofi,
      codofi: result.data.codofi,
    };

    const datos = {
      oficina,
    };

    res.render("admin/oficinas/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const insertOficina = async (req, res) => {
  const user = req.user;
  const oficina = {
    desofi: req.body.desofi,
    codofi: req.body.codofi,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearOficina,
  };

  try {
    await axios.post("http://localhost:8000/api/oficinas/insert", {
      oficina,
      movimiento,
    });

    res.redirect("/admin/oficinas");
  } catch (error) {
    let msg = "No se ha podido crear la oficina.";

    if (error.response.data.errorNum === 20100) {
      msg = "La oficina ya existe.";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const updateOficina = async (req, res) => {
  const user = req.user;
  const oficina = {
    idofic: req.body.idofic,
    desofi: req.body.desofi,
    codofi: req.body.codofi,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarOficina,
  };

  try {
    await axios.post("http://localhost:8000/api/oficinas/update", {
      oficina,
      movimiento,
    });

    res.redirect("/admin/oficinas");
  } catch (error) {
    let msg =
      "No se han podido modificar los datos de la oficina. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "La oficina ya existe";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const deleteOficina = async (req, res) => {
  const user = req.user;
  const oficina = {
    idofic: req.body.idofic,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarOficina,
  };

  try {
    await axios.post("http://localhost:8000/api/oficinas/delete", {
      oficina,
      movimiento,
    });

    res.redirect("/admin/oficinas");
  } catch (error) {
    const msg = "No se ha podido elminar la oficina.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
