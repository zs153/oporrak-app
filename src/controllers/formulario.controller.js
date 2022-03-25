import axios from "axios";
import jwt from "jsonwebtoken";
import {
  estadosDocumento,
  estadosSms,
  origenTipo,
  tiposMovimiento,
  tiposVisualizacion,
  tiposRol,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;
  const documento = {
    stadoc: tiposVisualizacion.resueltos,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/formularios", {
      documento,
    });
    const resultOficinas = await axios.get(
      "http://localhost:8000/api/oficinas"
    );

    const datos = {
      documentos: result.data.dat,
      arrOficinas: resultOficinas.data.dat,
      tiposRol,
    };

    res.render("admin/formularios", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const fecha = new Date();

  try {
    const resultTipos = await axios.post(
      "http://localhost:8000/api/tipos/origen",
      {
        origen: origenTipo.formulario,
      }
    );
    let arrTipos = resultTipos.data;
    arrTipos.unshift({
      IDTIPO: 0,
      DESTIP: "SELECCIONE UN TIPO",
      AYUTIP: "",
      ORGTIP: 0,
    });

    const resultOficinas = await axios.get(
      "http://localhost:8000/api/oficinas"
    );
    const documento = {
      iddocu: 0,
      fecdoc: fecha.toISOString().substring(0, 10),
      nifcon: "",
      nomcon: "",
      emAcon: "",
      telcon: "",
      movcon: "",
      refdoc: "",
      tipdoc: 0,
      ejedoc: fecha.getFullYear() - 1,
      ofidoc: user.oficina,
      obsdoc: "",
      fundoc: user.userID,
      liqdoc: "",
      stadoc: estadosDocumento.pendiente,
    };
    const datos = {
      documento,
      arrTipos,
      arrOficinas: resultOficinas.data.dat,
    };

    res.render("admin/formularios/add", { user, datos });
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
    const resultTipos = await axios.post(
      "http://localhost:8000/api/tipos/origen",
      {
        origen: origenTipo.formulario,
      }
    );
    let arrTipos = resultTipos.data;
    arrTipos.unshift({
      IDTIPO: 0,
      DESTIP: "SELECCIONE UN TIPO",
      AYUTIP: "",
      ORGTIP: 0,
    });
    const resultOficinas = await axios.get(
      "http://localhost:8000/api/oficinas"
    );
    const result = await axios.post("http://localhost:8000/api/formulario", {
      id: req.params.id,
    });

    const documento = {
      iddocu: result.data.iddocu,
      fecdoc: result.data.fecdoc,
      nifcon: result.data.nifcon,
      nomcon: result.data.nomcon,
      emacon: result.data.emacon,
      telcon: result.data.telcon,
      movcon: result.data.movcon,
      refdoc: result.data.refdoc,
      tipdoc: result.data.tipdoc,
      ejedoc: result.data.ejedoc,
      ofidoc: result.data.ofidoc,
      obsdoc: result.data.obsdoc,
      fundoc: result.data.fundoc,
      liqdoc: result.data.liqdoc,
    };
    const datos = {
      documento,
      arrTipos,
      arrOficinas: resultOficinas.data.dat,
    };

    res.render("admin/formularios/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const insertFormulario = async (req, res) => {
  const user = req.user;
  const referencia =
    "D" +
    randomString(
      10,
      "1234567890abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ"
    );
  const documento = {
    fecdoc: req.body.fecdoc,
    nifcon: req.body.nifcon,
    nomcon: req.body.nomcon,
    emacon: req.body.emacon,
    telcon: req.body.telcon,
    movcon: req.body.movcon,
    refdoc: referencia,
    tipdoc: req.body.tipdoc,
    ejedoc: req.body.ejedoc,
    ofidoc: req.body.ofidoc,
    obsdoc: req.body.obsdoc,
    fundoc: req.body.fundoc,
    liqdoc: "PEND",
    stadoc: estadosDocumento.pendiente,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearDocumento,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/formularios/insert",
      {
        documento,
        movimiento,
      }
    );

    res.redirect("/admin/formularios");
  } catch (error) {
    let msg = "No se ha podido crear el formulario.";

    if (error.response.data.errorNum === 20100) {
      msg = "El formulario ya existe.";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const updateFormulario = async (req, res) => {
  const user = req.user;

  const documento = {
    iddocu: req.body.iddocu,
    fecdoc: req.body.fecdoc,
    nifcon: req.body.nifcon,
    nomcon: req.body.nomcon,
    emacon: req.body.emacon,
    telcon: req.body.telcon,
    movcon: req.body.movcon,
    tipdoc: req.body.tipdoc,
    ejedoc: req.body.ejedoc,
    ofidoc: req.body.ofidoc,
    obsdoc: req.body.obsdoc,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarDocumento,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/formularios/update",
      {
        documento,
        movimiento,
      }
    );

    res.redirect("/admin/formularios");
  } catch (error) {
    let msg = "No se ha podido actualizar el formulario.";

    if (error.response.data.errorNum === 20100) {
      msg = "El formulario ya existe. Verifique nif, tipo y/o ejercicio";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const deleteFormulario = async (req, res) => {
  const user = req.user;
  const documento = {
    id: req.body.iddocu,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.borrarDocumento,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/formularios/delete",
      {
        documento,
        movimiento,
      }
    );

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg =
      "No se ha podido elminar el formulario. El error puede deberse a que el documento ya no existe.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const asignarFormulario = async (req, res) => {
  const user = req.user;
  const documento = {
    id: req.body.iddocu,
    liquidador: user.userID,
    estado: estadosDocumento.asignado,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.asignarFormulario,
  };

  try {
    const resul = await axios.post("http://localhost:8000/api/formulario", {
      id: req.body.iddocu,
    });

    if (resul.data.stadoc === estadosDocumento.pendiente) {
      const result = await axios.post(
        "http://localhost:8000/api/formularios/cambioEstado",
        {
          documento,
          movimiento,
        }
      );

      res.redirect("/admin/formularios");
    }
  } catch (error) {
    const msg =
      "No se ha podido asignar el formulario. El error puede deberse a que el documento ya no existe.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const resolverFormulario = async (req, res) => {
  const user = req.user;
  const documento = {
    id: req.body.iddocu,
    liquidador: user.userID,
    estado: estadosDocumento.resuelto,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.resolverFormulario,
  };

  try {
    const resul = await axios.post("http://localhost:8000/api/formulario", {
      id: req.body.iddocu,
    });

    if (resul.data.stadoc === estadosDocumento.asignado) {
      const result = await axios.post(
        "http://localhost:8000/api/formularios/cambioEstado",
        {
          documento,
          movimiento,
        }
      );

      /// envio sms
      if (req.body.chkenv) {
        const sms = {
          texsms: req.body.texsms,
          movsms: req.body.movsms,
          stasms: estadosSms.pendiente,
          iddocu: req.body.iddocu,
        };
        const movimiento = {
          usuarioMov: user.id,
          tipoMov: tiposMovimiento.crearSms,
        };

        try {
          await axios.post("http://localhost:8000/api/formularios/sms", {
            sms,
            movimiento,
          });
        } catch (error) {
          const msg =
            "No se ha podido enviar el sms. El envio tendrá que realizarse manualmente.";

          res.render("admin/error400", {
            alerts: [{ msg, error }],
          });
        }
      }
    }

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido resolver el formulario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const remitirFormulario = async (req, res) => {
  const user = req.user;
  const documento = {
    id: req.body.iddocu,
    liquidador: user.userID,
    estado: estadosDocumento.remitido,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.remitirFormulario,
  };

  try {
    const resul = await axios.post("http://localhost:8000/api/formulario", {
      id: req.body.iddocu,
    });

    if (resul.data.stadoc === estadosDocumento.asignado) {
      await axios.post("http://localhost:8000/api/formularios/cambioEstado", {
        documento,
        movimiento,
      });
    }

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido remitir el fraude.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const desadjudicarFormulario = async (req, res) => {
  const user = req.user;
  const documento = {
    id: req.body.iddocu,
    liquidador: "PEND",
    estado: estadosDocumento.pendiente,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.desasignarFormulario,
  };

  try {
    const resul = await axios.post("http://localhost:8000/api/formulario", {
      id: req.body.iddocu,
    });

    if (
      resul.data.stadoc === estadosDocumento.asignado ||
      resul.data.stadoc === estadosDocumento.resuelto ||
      resul.data.stadoc === estadosDocumento.remitido
    ) {
      await axios.post("http://localhost:8000/api/formularios/cambioEstado", {
        documento,
        movimiento,
      });
    }

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido desadjudicar el formulario.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const verTodo = async (req, res) => {
  const user = req.user;
  const documento = {
    stadoc: tiposVisualizacion.todos,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/formularios", {
      documento,
    });
    const resultOficinas = await axios.get(
      "http://localhost:8000/api/oficinas"
    );

    const datos = {
      documentos: result.data.dat,
      arrOficinas: resultOficinas.data.dat,
      tiposRol,
    };
    res.render("admin/formularios", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const sms = async (req, res) => {
  const user = req.user;
  const sms = {
    iddocu: req.body.docsms,
    texsms: req.body.texsms,
    movsms: req.body.movsms,
    stasms: estadosSms.pendiente,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearSms,
  };

  try {
    await axios.post("http://localhost:8000/api/formularios/sms", {
      sms,
      movimiento,
    });

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido enviar el sms.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const updatePerfil = async (req, res) => {
  const user = req.user;
  const usuario = {
    id: user.id,
    userid: req.body.userid,
    nombre: req.body.nomusu,
    email: req.body.emausu,
    rol: user.rol,
    oficina: req.body.ofiusu,
    telefono: req.body.telusu,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.modificarPerfil,
  };

  try {
    await axios.post("http://localhost:8000/api/formularios/updatePerfil", {
      usuario,
      movimiento,
    });

    const accessToken = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        userID: usuario.userid,
        email: usuario.email,
        rol: usuario.rol,
        oficina: usuario.oficina,
        telefono: usuario.telefono,
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "8h" }
    );
    const options = {
      path: "/",
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
      httpOnly: true,
    };

    res.cookie("auth", accessToken, options);
    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido actualizar el perfil de usuario";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const changePassword = async (req, res) => {
  const user = req.user;

  const usuario = {
    id: user.id,
    password: req.body.pwdusu,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.cambioPassword,
  };

  try {
    await axios.post("http://localhost:8000/api/formularios/cambio", {
      usuario,
      movimiento,
    });

    res.redirect("/admin/formularios");
  } catch (error) {
    const msg = "No se ha podido actualizar la contraseña.";

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
