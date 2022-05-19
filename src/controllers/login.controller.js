import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  estadosUsuario,
  tiposPerfil,
  tiposRol,
  tiposMovimiento,
} from "../public/js/enumeraciones";

export const loginPage = async (req, res) => {
  res.render("log/sign-in", { datos: {}, alerts: undefined });
};
export const forgotPage = async (req, res) => {
  res.render("log/forgot", { datos: {}, alerts: undefined });
};
export const registroPage = async (req, res) => {
  res.render("log/sign-up", { datos: {}, alerts: undefined });
};
export const okPage = async (req, res) => {
  res.render("log/ok");
};
export const verifyLogin = async (req, res) => {
  let usuario = {
    userid: req.body.userid,
  }
  const password = req.body.pwdusu

  try {
    const result = await axios.post("http://localhost:8000/api/usuario", {
      usuario,
    });

    usuario = result.data

    bcrypt.compare(password, usuario.PWDUSU, (err, result) => {
      if (result) {
        const accessToken = jwt.sign(
          {
            id: usuario.IDUSUA,
            nombre: usuario.NOMUSU,
            userID: usuario.USERID,
            email: usuario.EMAUSU,
            rol: usuario.ROLUSU,
            oficina: usuario.OFIUSU,
            telefono: usuario.TELUSU,
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

        const user = {
          id: usuario.IDUSUA,
          userID: usuario.USERID,
        };

        req.user = user;

        res.cookie("auth", accessToken, options);
        res.redirect("/admin");
      } else {
        res.render("log/sign-in", {
          datos: req.body,
          alerts: [{ msg: "El userID o la contraseña no son correctas" }],
        });
      }
    });
  } catch (error) {
    res.render("log/sign-in", {
      datos: req.body,
      alerts: [{ msg: "No se ha podido verificar la identidad del usuario" }],
    });
  }
};
export const verifyLogout = async (req, res) => {
  const options = {
    path: "/",
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  };

  res.clearCookie("x-access_token");
  res.cookie("auth", undefined, options);

  res.render("log/logout");
};
export const forgotPassword = async (req, res) => {
  const { emausu } = req.body;
  const randomString = Math.random().toString(36).substring(2, 10);
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(randomString, salt);
  const usuario = {
    emausu: emausu,
    pwdusu: passHash,
  };
  const movimiento = {
    tipmov: tiposMovimiento.olvidoPassword,
    saltus: randomString,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/forgot",
      {
        usuario,
        movimiento,
      }
    );

    res.render("log/okForgot");
  } catch (error) {
    const msg = "No se ha podido generar una nueva contraseña";

    res.render("log/sign-in", {
      datos: req.body,
      alerts: [{ msg }],
    });
  }
};
export const crearRegistro = async (req, res) => {
  const { userid, nomusu, emausu } = req.body;
  const randomString = Math.random().toString().slice(2, 6);
  const password = userid + randomString;
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(password, salt);
  const usuario = {
    nomusu: nomusu,
    ofiusu: 1,
    rolusu: userid === "go500" ? tiposRol.admin : tiposRol.usuario,
    userid: userid,
    emausu: emausu,
    perusu: tiposPerfil.general,
    telusu: "0000",
    stausu: estadosUsuario.activo,
    pwdusu: passHash,
    tipmov: tiposMovimiento.registroUsuario,
    saltus: password,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/registro",
      {
        usuario,
      }
    );

    res.render("log/ok");
  } catch (error) {
    let msg = "No se ha podido registrar al usuario";
    if (error.response.data.errorNum === 20100) {
      msg = "El usuario ya esta registrado";
    }
    res.render("log/sign-up", {
      datos: req.body,
      alerts: [{ msg }],
    });
  }
};
