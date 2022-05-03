import axios from "axios";
import jwt from "jsonwebtoken";
import {
  estadosDocumento,
  estadosCita,
  tiposMovimiento,
  tiposRol,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;
  const ofic = decodeURIComponent(req.cookies.oficina);
  const cita = {
    stacit: estadosCita.asignado,
    oficit: ofic === "undefined" ? user.oficina : ofic,
  };
  const verTodo = false;

  try {
    const result = await axios.post("http://localhost:8000/api/citas", {
      cita,
    });

    const datos = {
      citas: result.data,
      estadosCita,
    };

    res.render("admin/citas", { user, datos, oficina: cita.oficit });
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
    const result = await axios.post("http://localhost:8000/api/cita", {
      idcita: req.params.id,
    });

    const cita = {
      idcita: result.data.IDCITA,
      orgcit: result.data.ORGCIT,
      oficit: result.data.OFICIT,
      feccit: result.data.STRFEC,
      horcit: result.data.HORCIT,
      nifcon: result.data.NIFCON,
      nomcon: result.data.NOMCON,
      telcon: result.data.TELCON,
      descit: result.data.DESCIT,
      notcit: result.data.NOTCIT,
      obscit: result.data.OBSCIT,
      stacit: result.data.STACIT,
      desofi: result.data.DESOFI,
    };
    const datos = {
      cita,
    };

    res.render("admin/citas/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const update = async (req, res) => {
  const user = req.user;

  const cita = {
    idcita: req.body.idcita,
    obscit: req.body.obscit,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarCita,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/citas/update", {
      cita,
      movimiento,
    });

    res.redirect("/admin/citas");
  } catch (error) {
    const msg = "No se ha podido actualizar la cita.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const asign = async (req, res) => {
  const user = req.user;
  const referencia = "IC" + randomString(9, "1234567890YMGS");
  const fecha = new Date();

  try {
    const result = await axios.post("http://localhost:8000/api/cita", {
      idcita: req.body.idcita,
    });

    const cita = {
      // cita
      idcita: result.data.IDCITA,
      stacit: estadosCita.asignado,
    };
    const formulario = {
      fecdoc: fecha.toISOString().slice(0, 10),
      nifcon: result.data.NIFCON,
      nomcon: result.data.NOMCON,
      emacon: "",
      telcon: result.data.TELCON,
      movcon: "600000000",
      refdoc: referencia,
      tipdoc: req.body.tipdoc,
      ejedoc: fecha.getFullYear() - 1,
      ofidoc: user.oficina,
      obsdoc: result.data.OBSCIT,
      fundoc: user.userID,
      liqdoc: "PEND",
      stadoc: estadosDocumento.pendiente,
    };
    const movimiento = {
      usumov: user.id,
      tipmov: tiposMovimiento.asignarCita,
    };

    if (result.data.STACIT === estadosCita.disponible) {
      const result = await axios.post(
        "http://localhost:8000/api/citas/asignar",
        {
          cita,
          formulario,
          movimiento,
        }
      );

      res.redirect("/admin/citas");
    } else {
      const msg = "La cita no esta disponible para asignar.";

      res.render("admin/error400", {
        alerts: [{ msg }],
      });
    }
  } catch (error) {
    const msg =
      "No se ha podido asignar la cita. El error puede deberse a que el documento ya no existe.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const verTodo = async (req, res) => {
  const user = req.user;
  const ofic = decodeURIComponent(req.cookies.oficina);
  const cita = {
    stacit: estadosCita.disponible,
    oficit: ofic === "undefined" ? user.oficina : ofic,
  };
  const verTodo = true;

  try {
    const result = await axios.post("http://localhost:8000/api/citas", {
      cita,
    });

    const datos = {
      citas: result.data,
      tiposRol,
      estadosCita,
      verTodo,
    };

    res.render("admin/citas", { user, datos, oficina: cita.oficit });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const citasOficina = async (req, res) => {
  const user = req.user;
  const verTodo = true;
  const cita = {
    stacit: estadosCita.asignado,
    oficit: req.params.id,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/citas", {
      cita,
    });

    const datos = {
      citas: result.data,
      tiposRol,
      estadosCita,
      verTodo,
    };

    res.render("admin/citas", { user, datos, oficina: cita.oficit });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};

// helpers
function randomString(long, chars) {
  let result = "";
  for (let i = long; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
