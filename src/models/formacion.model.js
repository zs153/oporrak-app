import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseMatriculasQuery = `SELECT 
  mm.*
FROM matriculas mm
`
const baseCursosQuery = `SELECT 
  cc.descur
FROM usuarioscurso uc
INNER JOIN cursos cc ON cc.idcurs = uc.idcurs
WHERE uc.idusua = :idusua
`
// matriculas
export const findMatriculas = async (context) => {
  let query = baseMatriculasQuery
  let binds = {}

  if (context.STAMAT) {
    binds.stamat = context.STAMAT
    query += `WHERE mm.stamat = :stamat`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}

// cursos
export const findCursos = async (context) => {
  let query = baseCursosQuery
  let binds = {}

  if (context.IDUSUA) {
    binds.idusua = context.IDUSUA
    query += `WHERE cc.idusua = :idusua`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
