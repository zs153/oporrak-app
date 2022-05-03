import axios from "axios";
import {
  arrEstadosSms,
  estadosSms,
  tiposMovimiento,
  tiposRol,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;
  const sms = {
    stasms: estadosSms.enviado,
  };
  const verTodo = false;

  try {
    const result = await axios.post("http://localhost:8000/api/smss", {
      sms,
    });
    const datos = {
      smss: result.data,
      tiposRol,
    };

    res.render("admin/smss", { user, datos });
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
      idsmss: req.params.id,
    });

    if (result) {
      const sms = {
        idsmss: result.data.IDSMSS,
        texsms: result.data.TEXSMS,
        movsms: result.data.MOVSMS,
        stasms: result.data.STASMS,
        refdoc: result.data.REFDOC,
      };
      const datos = {
        sms,
        arrEstadosSms,
      };

      res.render("admin/smss/edit", { user, datos });
    }
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
    texsms: req.body.texsms,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.crearSms,
  };
  const formulario = {
    refdoc: req.body.refdoc,
  };

  try {
    // referencia
    const result = await axios.post(
      "http://localhost:8000/api/formularios/referencia",
      {
        formulario,
      }
    );

    if (result) {
      formulario.iddocu = result.data.IDDOCU;
      sms.movsms = result.data.MOVCON;
      sms.stasms = estadosSms.pendiente;

      await axios.post("http://localhost:8000/api/smss/insert", {
        sms,
        formulario,
        movimiento,
      });

      res.redirect("/admin/smss");
    }
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
    usumov: user.id,
    tipmov: tiposMovimiento.modificarSms,
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
    usumov: user.id,
    tipmov: tiposMovimiento.borrarSms,
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
