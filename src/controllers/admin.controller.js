import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { tiposMovimiento } from "../public/js/enumeraciones";

export const mainPage = async (req, res) => {
  const user = req.user;

  res.render("admin/index", { user });
};
export const estadisticaPage = async (req, res) => {
  const user = req.user;

  res.render("admin/estadistica", { user });
};
export const acumuladosPage = async (req, res) => {
  const user = req.user;

  res.render("admin/estadistica/acumulados", { user });
};
export const errorPage = async (req, res) => {
  res.render("admin/error400");
};
// proc
export const estadistica = async (req, res) => {
  const user = req.user;
  const periodo = {
    desde: req.body.desde,
    hasta: req.body.hasta,
  };

  const result = await axios.post(
    "http://localhost:8000/api/formularios/estadistica",
    { periodo }
  );

  res.render("admin/estadistica/acumulados", { user, datos: result.data });
};
export const changePassword = async (req, res) => {
  const user = req.user;
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(req.body.pwdusu, salt);
  const usuario = {
    idusua: req.body.idusua,
    pwdusu: passHash,
  };
  const movimiento = {
    usumov: user.id,
    tipmov: tiposMovimiento.cambioPassword,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/cambio",
      {
        usuario,
        movimiento,
      }
    );

    res.redirect("/admin");
  } catch (error) {
    res.redirect("/admin");
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
