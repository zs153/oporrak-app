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
  tiposMovimiento,
} from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get("http://localhost:8000/api/usuarios");

    const datos = { usuarios: result.data.dat };
    res.render("admin/usuarios", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const addPage = async (req, res) => {
  const user = req.user;
  const usuario = {
    idusua: 0,
    nomusu: "",
    ofiusu: 1,
    rolusu: tiposRol.usuario,
    userid: "",
    emausu: "",
    perusu: tiposPerfil.general,
    telusu: "",
    stausu: estadosUsuario.activo,
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
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const editPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.post("http://localhost:8000/api/usuario", {
      userid: req.params.userid,
    });
    const usuario = {
      idusua: result.data.idusua,
      nomusu: result.data.nomusu,
      ofiusu: result.data.ofiusu,
      rolusu: result.data.rolusu,
      userid: result.data.userid,
      emausu: result.data.emausu,
      perusu: result.data.perusu,
      telusu: result.data.telusu,
      stausu: result.data.stausu,
    };

    // oficinas
    const ret = await axios.get("http://localhost:8000/api/oficinas");
    const datos = {
      usuario,
      arrTiposRol,
      arrTiposPerfil,
      arrEstadosUsuario,
      arrOficinas: ret.data.dat,
    };

    res.render("admin/usuarios/edit", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const perfilPage = async (req, res) => {
  const user = req.user;

  try {
    const result = await axios.get(
      `http://localhost:8000/api/usuarios/${user.id}`
    );

    const usuario = {
      idusua: result.data.IDUSUA,
      nomusu: result.data.NOMUSU,
      ofiusu: result.data.OFIUSU,
      userid: result.data.USERID,
      emausu: result.data.EMAUSU,
      telusu: result.data.TELUSU,
    };

    // oficinas
    const ret = await axios.get("http://localhost:8000/api/oficinas");
    const datos = {
      usuario,
      arrOficinas: ret.data,
    };
    res.render("admin/usuarios/perfil", { user, datos });
  } catch (error) {
    const msg = "No se ha podido acceder a los datos de la aplicación.";

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const insertUsuario = async (req, res) => {
  const user = req.user;
  const usuario = {
    nomusu: req.body.nomusu,
    ofiusu: req.body.ofiusu,
    rolusu: req.body.rolusu,
    userid: req.body.userid,
    emausu: req.body.emausu,
    perusu: req.body.perusu,
    telusu: req.body.telusu,
    stausu: req.body.stausu,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearUsuario,
  };

  try {
    await axios.post("http://localhost:8000/api/usuarios/insert", {
      usuario,
      movimiento,
    });

    res.redirect("/admin/usuarios");
  } catch (error) {
    let msg = "No se ha podido crear el nuevo usuario.";

    if (error.response.data.errorNum === 20100) {
      msg = "El usuario ya está registrado";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const updateUsuario = async (req, res) => {
  const user = req.user;

  const usuario = {
    idusua: req.body.idusua,
    nomusu: req.body.nomusu,
    ofiusu: req.body.ofiusu,
    rolusu: req.body.rolusu,
    userid: req.body.userid,
    emausu: req.body.emausu,
    perusu: req.body.perusu,
    telusu: req.body.telusu,
    stausu: req.body.stausu,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearUsuario,
  };

  try {
    await axios.post("http://localhost:8000/api/usuarios/update", {
      usuario,
      movimiento,
    });

    res.redirect("/admin/usuarios");
  } catch (error) {
    let msg =
      "No se han podido modificar los datos del usuario. Verifique los datos introducidos";

    if (error.response.data.errorNum === 20100) {
      msg =
        "El usuario ya está registrado. Verifique el userID y la contraseña.";
    }

    res.render("admin/error400", {
      alerts: [{ msg }],
    });
  }
};
export const deleteUsuario = async (req, res) => {
  const user = req.user;
  const usuario = {
    idusua: req.body.idusua,
  };
  const movimiento = {
    usuarioMov: user.id,
    tipoMov: tiposMovimiento.crearUsuario,
  };

  try {
    await axios.post("http://localhost:8000/api/usuarios/delete", {
      usuario,
      movimiento,
    });

    res.redirect("/admin/usuarios");
  } catch (error) {
    const msg = "No se ha podido elminar la oficina.";

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
    idusua: user.id,
    nomusu: req.body.nomusu,
    ofiusu: req.body.ofiusu,
    emausu: req.body.emausu,
    telusu: req.body.telusu,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.modificarPerfil,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/perfil",
      {
        usuario,
        movimiento,
      }
    );

    const accessToken = jwt.sign(
      {
        id: user.id,
        nombre: usuario.nomusu,
        userID: user.userID,
        email: usuario.emausu,
        rol: user.rol,
        oficina: usuario.ofiusu,
        telefono: usuario.telusu,
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
    console.log(accessToken);
    res.cookie("auth", accessToken, options);
    res.redirect("/admin");
  } catch (error) {
    res.redirect("/admin");
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
