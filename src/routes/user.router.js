import express from 'express'
import authRoutes from '../middleware/auth'
import * as usuario from '../controllers/user/usuario.controller'
import * as formacion from '../controllers/user/formacion.controller'
import * as estado from '../controllers/user/estado.controller'
import * as calendario from '../controllers/user/calendario.controller'

const userRouter = express.Router()

//--------------- paginas
userRouter.get('/', authRoutes, usuario.mainPage)
userRouter.get("/logout", usuario.logoutPage)

// perfil
userRouter.get('/perfil/:userid', authRoutes, usuario.perfilPage)

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
userRouter.post('/perfil', authRoutes, usuario.updatePerfil)

// calendario
userRouter.post("/calendarios/update", authRoutes, calendario.update);

// formacion
userRouter.post('/formacion/matriculas/usuarios/insert', authRoutes, formacion.quieroMatricularme)

// estados
userRouter.post("/estados/estados", authRoutes, estado.estadosPage);

export default userRouter