import express from 'express'
import {
  estado,
  estados,
  crear,
  borrar,
  estadosUsuario,
  estadosFechaUsuario,
  estadosOficinaPerfil,
  crearTraspaso,
  borrarTraspaso,
  estadosFechaPerfil,
} from '../controllers/estado.controller'

const apiEstadoRouter = express.Router()

// estados
apiEstadoRouter.post('/estados', estado)
apiEstadoRouter.post('/estados', estados)
apiEstadoRouter.post('/estados/insert', crear)
apiEstadoRouter.post('/estados/delete', borrar)

// usuario
apiEstadoRouter.post('/estados/usuarios', estadosUsuario)
apiEstadoRouter.post('/estados/usuarios/fechas', estadosFechaUsuario)
apiEstadoRouter.post('/estados/usuarios/perfiles', estadosFechaPerfil)
apiEstadoRouter.post('/estados/oficinas/perfiles', estadosOficinaPerfil)

// traspaso
apiEstadoRouter.post('/estados/insert/traspaso', crearTraspaso)
apiEstadoRouter.post('/estados/delete/traspaso', borrarTraspaso)

export default apiEstadoRouter
