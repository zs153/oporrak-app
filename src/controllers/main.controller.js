import { serverAUTH } from "../config/settings";

export const mainPage = async (req, res) => {
  res.redirect(`http://${serverAUTH}:9000/auth`)
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