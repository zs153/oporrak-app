import express from 'express'
import {
  festivo,
  festivos,
  crear,
  borrar,
  festivosOficina,
} from '../controllers/festivo.controller'

const apifestivoRouter = express.Router()

// festivos comunes
apifestivoRouter.post('/festivo', festivo)
apifestivoRouter.post('/festivos', festivos)
apifestivoRouter.post('/festivos/insert', crear)
apifestivoRouter.post('/festivos/delete', borrar)

// festivos locales
apifestivoRouter.post('/festivos/oficinas', festivosOficina)

export default apifestivoRouter
