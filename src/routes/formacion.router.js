import express from 'express'
import {
  matricula,
  curso,
} from '../controllers/formacion.controller'

const apiFormacionRouter = express.Router()

// cursos
apiFormacionRouter.post('/formacion/curso', curso)
apiFormacionRouter.post('/formacion/matricula', matricula)

export default apiFormacionRouter
