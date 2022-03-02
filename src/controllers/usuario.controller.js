import axios from "axios";
import jwt from "jsonwebtoken";
import { io } from "socket.io-client";
import {
  arrTiposRol,
  arrTiposPerfil,
  arrEstadosUsuario,
  tiposRol,
  estadosUsuario,
  tiposPerfil,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get("http://localhost:8000/api/usuarios");

    const datos = { usuarios: result.data.dat };
    res.render("admin/usuarios", { user, datos });
  } catch (error) {
    res.redirect("/");
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const usuario = {
    id: 0,
    nombre: "",
    oficina: 1,
    rol: tiposRol.usuario,
    userid: "",
    email: "",
    perfil: tiposPerfil.general,
    telefono: "",
    estado: estadosUsuario.activo,
  };

  try {
    // oficinas
    const result = await axios.get("http://localhost:8000/api/oficinas");

    const datos = {
      usuario,
      arrTiposRol,
      arrTiposPerfil,
      arrEstadosUsuario,
      arrOficinas: result.data.dat,
    };

    res.render("admin/usuarios/add", { user, datos });
  } catch (error) {
    // no se pueden cargar las oficinas
    res.redirect("/admin/usuarios");
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8000/api/usuario", {
      userid: req.params.userid,
    });
    const usuario = {
      id: result.data.idusua,
      nombre: result.data.nomusu,
      oficina: result.data.ofiusu,
      rol: result.data.rolusu,
      userid: result.data.userid,
      email: result.data.emausu,
      perfil: result.data.perusu,
      telefono: result.data.telusu,
      estado: result.data.stausu,
    };

    // oficinas
    const ret = await axios.get("http://localhost:8000/api/oficinas");
    const datos = {
      usuario,
      arrTiposRol,
      arrTiposPerfil,
      arrEstadosUsuario,
      arrOficinas: ret.data.dat,
      alerts: undefined,
    };

    res.render("admin/usuarios/edit", { user, datos });
  } catch (error) {
    res.redirect("/");
  }
};
export const insertUsuario = async (req, res) => {
  const user = req.user;
  const usuario = {
    nombre: req.body.nomusu.toUpperCase(),
    oficina: req.body.ofiusu,
    rol: req.body.rolusu,
    userid: req.body.userid.toLowerCase(),
    email: req.body.emausu,
    perfil: req.body.perusu,
    telefono: req.body.telusu,
    estado: req.body.stausu,
    usuarioMov: user.id,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/insert",
      {
        usuario,
      }
    );

    res.redirect("/admin/usuarios");
  } catch (error) {
    let msg =
      "No se ha podido crear el nuevo usuario. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg = "El usuario ya está registrado";
    }
    try {
      const result = await axios.get("http://localhost:8000/api/oficinas");

      const datos = {
        usuario,
        arrTiposRol,
        arrTiposPerfil,
        arrEstadosUsuario,
        arrOficinas: result.data.dat,
      };

      res.render("admin/usuarios/add", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/usuarios");
    }
  }
};
export const updateUsuario = async (req, res) => {
  const user = req.user;

  const usuario = {
    id: req.body.idusua,
    nombre: req.body.nomusu,
    oficina: req.body.ofiusu,
    rol: req.body.rolusu,
    userid: req.body.userid,
    email: req.body.emausu,
    perfil: req.body.perusu,
    telefono: req.body.telusu,
    estado: req.body.stausu,
    usuarioMov: user.id,
  };
  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/update",
      {
        usuario,
      }
    );

    res.redirect("/admin/usuarios");
  } catch (error) {
    let msg =
      "No se han podido modificar los datos del usuario. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg =
        "El usuario ya está registrado. Verifique el userID y la contraseña.";
    }
    try {
      // oficinas
      const result = await axios.get("http://localhost:8000/api/oficinas");

      const datos = {
        usuario,
        arrTiposRol,
        arrTiposPerfil,
        arrEstadosUsuario,
        arrOficinas: result.data.dat,
      };

      res.render("admin/usuarios/edit", { user, datos, alerts: [{ msg }] });
    } catch (error) {
      res.redirect("/admin/usuarios");
    }
  }
};
export const deleteUsuario = async (req, res) => {
  const user = req.user;
  const usuario = {
    id: req.body.idusua,
    usuarioMov: user.id,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/delete",
      {
        usuario,
      }
    );

    res.redirect("/admin/usuarios");
  } catch (error) {
    res.redirect("/admin/usuarios");
  }
};
export const changePassword = async (req, res) => {
  const user = req.user;

  const usuario = {
    id: user.id,
    password: req.body.pwdusu,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/cambio",
      {
        usuario,
      }
    );

    res.redirect("/admin/usuarios");
  } catch (error) {
    res.redirect("/admin/usuarios");
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
    oficina: user.oficina,
    telefono: req.body.telusu,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/updatePerfil",
      {
        usuario,
      }
    );

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
    res.redirect("/admin/usuarios");
  } catch (error) {
    res.redirect("/admin/usuarios");
  }
};
export const restablecerPassword = async (req, res) => {
  const user = req.user;
  const usuario = {
    id: req.body.idusua,
    usuarioMov: user.id,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/restablecer",
      {
        usuario,
      }
    );

    res.redirect("/admin/usuarios");
  } catch (error) {
    res.redirect("/admin/usuarios");
  }
};
export const enviarNotificacion = async (req, res) => {
  const user = req.user;

  try {
    const socket = io("http://localhost:4000");
    socket.emit("send-message", req.body.texnot);

    res.redirect("/admin/usuarios");
  } catch (error) {
    res.redirect("/admin/usuarios");
  }
};
