import Usuario from "../models/usuario.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { userid, password } = req.body;

  try {
    const usuario = new Usuario();
    usuario.userID = userid;

    const result = await usuario.getUsuarioByUserID();

    if (!(usuario.userID === userid)) {
      res.status(404).json("Usuario no encontrado");
    } else {
      bcrypt.compare(password, usuario.password, (err, result) => {
        if (err) {
          res.status(405).json("La contraseña no es correcta");
        }

        if (result) {
          const accessToken = jwt.sign(
            {
              id: usuario.id,
              userID: usuario.userid,
              rol: usuario.rol,
              perfil: usuario.perfil,
              oficina: usuario.oficina,
            },
            `${process.env.ACCESS_TOKEN_SECRET}`,
            { expiresIn: "8h" }
          );

          const { password, ...resto } = usuario;
          res.status(200).json({ ...resto, accessToken });
        }
      });
    }
  } catch (error) {
    res.status(500).json("No se ha podido conectar con el servidor");
  }
};
export const logout = async (req, res) => {
  const options = {
    path: "/",
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  };

  res.clearCookie("x-access_token");
  res.cookie("auth", undefined, options);

  res.status(200).json("logout");
};
