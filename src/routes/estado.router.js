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
  crearRango,
  actualizaTraspasos,
  actualizaEstados,
} from '../controllers/estado.controller'

const apiEstadoRouter = express.Router()

// estados
apiEstadoRouter.post('/estado', estado)
apiEstadoRouter.post('/estados', estados)
apiEstadoRouter.post('/estados/insert', crear)
apiEstadoRouter.post('/estados/delete', borrar)
apiEstadoRouter.post('/estados/inserts', crearRango)
apiEstadoRouter.post('/estados/update', actualizaEstados)

// usuario
apiEstadoRouter.post('/estados/usuarios', estadosUsuario)
apiEstadoRouter.post('/estados/usuarios/fechas', estadosFechaUsuario)
apiEstadoRouter.post('/estados/usuarios/perfiles', estadosFechaPerfil)
apiEstadoRouter.post('/estados/oficinas/perfiles', estadosOficinaPerfil)

// traspaso
apiEstadoRouter.post('/estados/insert/traspaso', crearTraspaso)
apiEstadoRouter.post('/estados/delete/traspaso', borrarTraspaso)
apiEstadoRouter.post('/estados/update/traspasos', actualizaTraspasos)

export default apiEstadoRouter
