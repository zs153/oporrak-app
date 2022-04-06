import axios from "axios";
import jwt from "jsonwebtoken";
import {
  estadosCita,
  tiposMovimiento,
  tiposVisualizacion,
  tiposRol,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;
  const documento = {
    stacit: tiposVisualizacion.pendientes,
  };
  const verTodo = false;

  try {
    const result = await axios.post("http://localhost:8000/api/citas", {
      documento,
    });

    const datos = {
      citas: result.data.dat,
      tiposRol,
      estadosCita,
      verTodo,
    };

    res.render("admin/citas", { user, datos });
  } catch (error) {
    console.log(error);
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const asignarCita = async (req, res) => {
  const user = req.user;
  const documento = {
    id: req.body.idcita,
    administrativo: user.userID,
    estado: estadosCita.asignado,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.asignarCita,
  };

  try {
    const resul = await axios.post("http://localhost:8000/api/cita", {
      id: req.body.idcita,
    });

    if (resul.data.stacit === estadosCita.pendiente) {
      const result = await axios.post(
        "http://localhost:8000/api/citas/cambioEstado",
        {
          documento,
          movimiento,
        }
      );

      res.redirect("/admin/citas");
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
  const documento = {
    stacit: tiposVisualizacion.todos,
  };
  const verTodo = true;

  try {
    const result = await axios.post("http://localhost:8000/api/citas", {
      documento,
    });
    const resultOficinas = await axios.get(
      "http://localhost:8000/api/oficinas"
    );

    const datos = {
      citas: result.data.dat,
      arrOficinas: resultOficinas.data.dat,
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
