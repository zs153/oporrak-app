import { puertoAUTH, puertoWEB, serverAUTH, serverWEB } from "../config/settings";

export const mainPage = async (req, res) => {
  const strUrl = encodeURIComponent(`${serverWEB}:${puertoWEB}`);

  res.redirect(`http://${serverAUTH}:${puertoAUTH}/log/login/?valid=${strUrl}`)
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
  res.cookie("noVer", undefined, options);

  res.redirect('/')
};