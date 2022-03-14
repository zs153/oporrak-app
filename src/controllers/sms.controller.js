import axios from "axios";
import {
  arrEstadosSms,
  estadosSms,
  tiposMovimiento,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get("http://localhost:8000/api/smss");

    res.render("admin/smss", { user, smss: result.data.dat });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const sms = {
    idsmss: 0,
    texsms: "",
    movsms: "",
    stasms: estadosSms.pendiente,
  };

  try {
    const datos = {
      sms,
      arrEstadosSms,
    };

    res.render("admin/smss/add", { user, datos });
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
    const result = await axios.post("http://localhost:8000/api/sms", {
      id: req.params.id,
    });

    const sms = {
      idsmss: result.data.idsmss,
      texsms: result.data.texsms,
      movsms: result.data.movsms,
      stasms: result.data.stasms,
      refdoc: result.data.refdoc,
    };
    const datos = {
      sms,
      arrEstadosSms,
    };

    res.render("admin/smss/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const insertSms = async (req, res) => {
  const user = req.user;
  const sms = {
    refdoc: req.body.refdoc,
    texsms: req.body.texsms,
    stasms: estadosSms.pendiente,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearSms,
  };

  try {
    // referencia
    const result = await axios.post(
      "http://localhost:8000/api/formularios/referencia",
      {
        referencia: sms.refdoc,
      }
    );

    const documento = {
      movil: result.data.movcon,
      idDocumento: result.data.iddocu,
    };
    await axios.post("http://localhost:8000/api/smss/insert", {
      sms,
      documento,
      movimiento,
    });

    res.redirect("/admin/smss");
  } catch (error) {
    let msg = "No se ha podido crear el sms. Verifique la referencia";

    if (error.response.data.errorNum === 20100) {
      msg = "El sms ya existe.";
    }
    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const updateSms = async (req, res) => {
  const user = req.user;
  const sms = {
    idsmss: req.body.idsmss,
    texsms: req.body.texsms,
    stasms: req.body.stasms,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarSms,
  };
  try {
    const result = await axios.post("http://localhost:8000/api/smss/update", {
      sms,
      movimiento,
    });

    res.redirect("/admin/smss");
  } catch (error) {
    let msg =
      "No se han podido modificar los datos del sms. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El sms ya existe";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const deleteSms = async (req, res) => {
  const user = req.user;
  const sms = {
    idsmss: req.body.idsmss,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarSms,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/smss/delete", {
      sms,
      movimiento,
    });

    res.redirect("/admin/smss");
  } catch (error) {
    const msg = "No se ha podido elminar el sms.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
