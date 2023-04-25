import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage, perfilPage, updatePerfil,
  changePassword,
  logoutPage,
} from '../controllers/user.controller'
import * as formacion from '../controllers/user/formacion.controller'
import * as estado from '../controllers/user/estado.controller'
import * as calendario from '../controllers/user/calendario.controller'

const userRouter = express.Router()

//--------------- paginas
userRouter.get('/', authRoutes, mainPage)
userRouter.get("/logout", logoutPage)

// perfil
userRouter.get('/perfil/:userid', authRoutes, perfilPage)

// calendario
userRouter.get('/calendario', authRoutes, calendario.mainPage)
userRouter.post("/calendarios/calendario", authRoutes, calendario.calendarioPage);

// formacion
userRouter.get('/formacion/matriculas', authRoutes, formacion.matriculasPage)
userRouter.get('/formacion/cursos', authRoutes, formacion.cursosPage)

// estados
userRouter.get("/estados", authRoutes, estado.mainPage);

//--------------- procedures
// perfil
userRouter.post('/perfil', authRoutes, updatePerfil)

// cambio password
userRouter.post('/cambio', authRoutes, changePassword)

// calendario
userRouter.post("/calendarios/update", authRoutes, calendario.update);

// formacion
userRouter.post('/formacion/matriculas/usuarios/insert', authRoutes, formacion.quieroMatricularme)

// estados
userRouter.post("/estados/estados", authRoutes, estado.estadosPage);

export default userRouter