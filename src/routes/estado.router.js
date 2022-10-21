import express from 'express'
import {
  estado,
  estados,
  crear,
  modificar,
  borrar,
  estadosUsuario,
} from '../controllers/estado.controller'

const apiEstadoRouter = express.Router()

// estados
apiEstadoRouter.post('/estados', estado)
apiEstadoRouter.post('/estados', estados)
apiEstadoRouter.post('/estados/insert', crear)
apiEstadoRouter.post('/estados/update', modificar)
apiEstadoRouter.post('/estados/delete', borrar)

// usuario
apiEstadoRouter.post('/estados/usuarios', estadosUsuario)

export default apiEstadoRouter
