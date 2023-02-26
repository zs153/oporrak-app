import express from 'express'
import {
  festivo,
  festivos,
  crear,
  borrar,
  festivosOficina,
  festivosLocal,
  actualizaFestivos,
} from '../controllers/festivo.controller'

const apiFestivoRouter = express.Router()

// festivos
apiFestivoRouter.post('/festivo', festivo)
apiFestivoRouter.post('/festivos', festivos)
apiFestivoRouter.post('/festivos/insert', crear)
apiFestivoRouter.post('/festivos/delete', borrar)
apiFestivoRouter.post('/festivos/update', actualizaFestivos)

// proc
apiFestivoRouter.post('/festivos/oficinas', festivosOficina)
apiFestivoRouter.post('/festivos/locales', festivosLocal)

export default apiFestivoRouter
