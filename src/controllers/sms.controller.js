import axios from "axios";
import { estadosSms, tiposMovimiento } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get("http://localhost:8000/api/smss");

    const datos = { oficinas: result.data.dat };
    res.render("admin/smss", { user, datos });
  } catch (error) {
    res.redirect("/");
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const sms = {
    id: 0,
    texto: "",
    movil: "",
  };

  try {
    const datos = {
      sms,
    };

    res.render("admin/smss/add", { user, datos });
  } catch (error) {
    res.redirect("/admin/smss");
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8000/api/sms", {
      id: req.params.id,
    });

    const sms = {
      id: result.data.idsmss,
      texto: result.data.texsms,
      movil: result.data.movsms,
      estado: result.data.stasms,
    };

    const datos = {
      sms,
    };

    res.render("admin/smss/edit", { user, datos });
  } catch (error) {
    res.redirect("/admin/smss");
  }
};
export const insertSms = async (req, res) => {
  const user = req.user;
  const sms = {
    texto: req.body.texsms,
    movil: req.body.movdoc,
    estado: estadosSms.pendiente,
    idDocumento: req.body.iddocu,
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearSms,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/smss/insert", {
      user,
      sms,
    });

    res.redirect("/admin/smss");
  } catch (error) {
    let msg = "No se ha podido crear el sms. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "La sms ya existe.";
    }
    try {
      const datos = {
        sms,
      };

      res.render("admin/smss/add", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/smss");
    }
  }
};
export const updateSms = async (req, res) => {
  const user = req.user;
  const sms = {
    id: req.body.idsmss,
    movil: req.body.movdoc,
    estado: req.body.stadoc,
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarSms,
  };
  try {
    const result = await axios.post("http://localhost:8000/api/smss/update", {
      user,
      sms,
    });

    res.redirect("/admin/smss");
  } catch (error) {
    let msg =
      "No se han podido modificar los datos del sms. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El sms ya existe";
    }

    try {
      const datos = {
        sms,
      };

      res.render("admin/smss/edit", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/smss");
    }
  }
};
export const deleteSms = async (req, res) => {
  const user = req.user;
  const sms = {
    id: req.body.idsmss,
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarSms,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/smss/delete", {
      user,
      sms,
    });

    res.redirect("/admin/smss");
  } catch (error) {
    res.redirect("/admin/smss");
  }
};
