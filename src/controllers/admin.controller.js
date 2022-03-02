import axios from "axios";
import jwt from "jsonwebtoken";

export const mainPage = async (req, res) => {
  const user = req.user;

  res.render("admin/", { user });
};
export const estadisticaPage = async (req, res) => {
  const user = req.user;

  res.render("admin/estadistica", { user });
};
export const acumuladosPage = async (req, res) => {
  const user = req.user;

  res.render("admin/estadistica/acumulados", { user });
};
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
  const usuario = {
    id: req.body.idusua,
    password: req.body.pwdusu,
  };

  try {
    const result = await axios.post(
      "http://localhost:8000/api/usuarios/cambio",
      {
        usuario,
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
    res.redirect("/admin/");
  } catch (error) {
    res.redirect("/admin/");
  }
};
