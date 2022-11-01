import express from 'express'
import {
  festivo,
  festivos,
  crear,
  borrar,
  festivosOficina,
} from '../controllers/festivo.controller'

const apiFestivoRouter = express.Router()

// festivos
apiFestivoRouter.post('/festivo', festivo)
apiFestivoRouter.post('/festivos', festivos)
apiFestivoRouter.post('/festivos/insert', crear)
apiFestivoRouter.post('/festivos/delete', borrar)

// festivos oficina
apiFestivoRouter.post('/festivos/oficinas', festivosOficina)

export default apiFestivoRouter
