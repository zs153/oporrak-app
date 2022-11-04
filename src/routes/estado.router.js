import express from 'express'
import {
  estado,
  estados,
  crear,
  borrar,
  estadosUsuario,
  estadosFechaUsuario,
  estadosOficinaPerfil,
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
apiEstadoRouter.post('/estados/oficinas/perfiles', estadosOficinaPerfil)

export default apiEstadoRouter
