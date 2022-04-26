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
  const cita = {
    stacit: estadosCita.asignado,
  };
  const verTodo = false;

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

    res.render("admin/citas", { user, datos });
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
      id: req.params.id,
    });

    const documento = {
      idcita: result.data.idcita,
      orgcit: result.data.orgcit,
      feccit: result.data.feccit,
      horcit: result.data.horcit,
      nifcon: result.data.nifcon,
      nomcon: result.data.nomcon,
      telcon: result.data.telcon,
      descit: result.data.descit,
      notcit: result.data.notcit,
      obscit: result.data.obscit,
      idofic: result.data.ofic.id,
      desofi: result.data.ofic.descripcion,
    };
    const datos = {
      documento,
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

  const documento = {
    idcita: req.body.idcita,
    obscit: req.body.obscit,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarCita,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/citas/update", {
      documento,
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
      id: req.body.idcita,
    });

    const documento = {
      // cita
      idcita: result.data.idcita,
      stacit: estadosCita.asignado,
      // formulario
      fecdoc: fecha.toISOString().slice(0, 10),
      nifcon: result.data.nifcon,
      nomcon: result.data.nomcon,
      emacon: "",
      telcon: result.data.telcon,
      movcon: "600000000",
      refdoc: referencia,
      tipdoc: 0,
      ejedoc: fecha.getFullYear() - 1,
      ofidoc: user.oficina,
      obsdoc: result.data.obscit,
      fundoc: user.userID,
      liqdoc: "PEND",
      stadoc: estadosDocumento.pendiente,
    };
    const movimiento = {
      usuarioMov: user.id,
      tipoMov: tiposMovimiento.asignarCita,
    };

    if (result.data.stacit === estadosCita.disponible) {
      const result = await axios.post(
        "http://localhost:8000/api/citas/asignar",
        {
          documento,
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
  const verTodo = true;
  const cita = {
    stacit: estadosCita.disponible,
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

    res.render("admin/citas", { user, datos });
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
