import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  estadosUsuario,
  tiposPerfil,
  tiposRol,
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
export const verifyLogin = async (req, res) => {
  const { userid, password } = req.body;
  try {
    const result = await axios.post("http://localhost:8000/api/usuario", {
      userid,
    });

    if (result) {
      const { idusua, userid, pasusu, rolusu, nomusu, emausu, ofiusu, telusu } =
        result.data;

      bcrypt.compare(password, pasusu, (err, result) => {
        if (err) {
          throw new Error(err);
        }

        if (result) {
          const accessToken = jwt.sign(
            {
              id: idusua,
              nombre: nomusu,
              userID: userid,
              email: emausu,
              rol: rolusu,
              oficina: ofiusu,
              telefono: telusu,
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
            id: idusua,
            userID: userid,
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
    }
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
  const email = req.body.emausu;

  const user = {
    email,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/forgot", {
      user,
    });

    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};
export const crearRegistro = async (req, res) => {
  const { userid, nomusu, emausu } = req.body;

  const nuevoRegistro = {
    nombre: nomusu,
    oficina: 1,
    rol: userid === "go500" ? tiposRol.admin : tiposRol.usuario,
    userid: userid,
    email: emausu,
    perfil: tiposPerfil.general,
    telefono: "0000",
    estado: estadosUsuario.activo,
  };

  try {
    const result = await axios.post("http://localhost:8000/api/registro", {
      nuevoRegistro,
    });

    res.redirect("/");
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
