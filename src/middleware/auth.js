import jwt from 'jsonwebtoken'
import { tiposRol } from '../public/js/enumeraciones'

const authRoutes = (req, res, next) => {
  const tokenHeader = req.cookies.auth

  if (typeof tokenHeader !== 'undefined') {
    try {
      jwt.verify(
        tokenHeader,
        `${process.env.ACCESS_TOKEN_SECRET}`,
        (err, user) => {
          if (err) {
            throw new Error('Token expirado')
          }

          req.user = user
          next()
        }
      )
    } catch (error) {
      res.render('log/sign-in', {
        datos: req.body,
        alerts: [{ msg: 'La contraseña no es correcta' }],
      })
    }
  } else {
    res.render('log/sign-in', { datos: req.body, alerts: undefined })
  }
}

export default authRoutes
