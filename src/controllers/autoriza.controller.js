import { createPrivateKey } from 'crypto'
import bcrypt from "bcrypt";
import { V4 } from 'paseto'
import { privateKey, secreto } from '../config/settings'
import * as DAL from "../models/autoriza.model";

// pages
export const loginPage = async (req, res) => {
  const url = req.query.valid

  res.render("sign-in", { datos: {url}, alerts: undefined });
};
export const olvidoPage = async (req, res) => {
  const url = req.query.valid
  
  res.render("forgot", { datos: {url}, alerts: undefined });
};

// procs
export const autorizar = async (req, res) => {
  const context = {
    userid: req.body.userid,
  }
  const url = req.body.url

  try {
    const rows = await DAL.find(context);

    if (rows.length === 1) {
      const usuario = rows[0];

      // password
      const pwdusu = req.body.pwdusu

      // verifica contaseña
      bcrypt.compare(pwdusu, usuario.PWDUSU, async (err, ret) => {
        if (err) {
          res.render('sign-in', {
            datos: req.body,
            alerts: [{ msg: 'No se ha podido verificar la identidad del usuario' }]
          })
        }
        if (ret) {
          // payload
          const payload = {
            userid: usuario.USERID,
            rol: usuario.ROLUSU,
          }
          const key = createPrivateKey({
            'key': privateKey,
            'format': 'pem',
            'type': 'pkcs8',
            'cipher': 'aes-256-cbc',
            'passphrase': secreto,
          })

          await V4.sign(payload, key, {
            audience: 'urn:client:claim',
            issuer: 'http://localhost:4600',
            expiresIn: '6 hours',
          }).then(token => {
            const options = {
              path: "/",
              sameSite: true,
              maxAge: 1000 * 60 * 60 * 6, // 6 horas
              httpOnly: true,
            }
            res.cookie('auth', token, options)
            res.cookie('noVer', '0')
            res.writeHead(302, {
              'Location': `http://${url}/admin`,
              'Content-Type': 'text/plain',
            })
            res.end()
          })
        } else {
          res.render('sign-in', {
            datos: req.body,
            alerts: [{ msg: 'La contraseña no es correcta' }]
          })
        }
      });

      return
    } else {
      res.render('sign-in', {
        datos: req.body,
        alerts: [{ msg: 'El usuario no existe' }]
      })
    }
  } catch (err) {
    res.render('sign-in', {
      datos: req.body,
      alerts: [{ msg: 'No se ha podido conectar con la base de datos' }]
    })
  }
};
export const olvido = async (req, res) => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const salt = await bcrypt.genSalt(10);
  const passHash = await bcrypt.hash(randomString, salt);
  const saltus = {
    saltus: randomString,
  }
  const activo = {
    emausu: req.body.emausu,
    pwdusu: passHash,
  };
  const context = Object.assign(activo, saltus)
  const url = req.body.url

  try {
    await DAL.forgot(context);

    res.render("okForgot", {
      url,
      alerts: undefined,
    });
  } catch (error) {
    res.render("sign-in", {
      datos: req.body,
      alerts: [{ msg: 'No se ha podido verificar la identidad del usuario' }]
    });
  }
};
