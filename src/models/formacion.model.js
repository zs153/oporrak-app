import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseMatriculasQuery = `SELECT 
  mm.*, mc.idcurs
FROM matriculas mm
LEFT JOIN (
  SELECT uu.idusua, um.idmatr
  FROM usuarios uu
  LEFT JOIN usuariosmatricula um ON um.idusua = uu.idusua
  WHERE uu.idusua = :idusua
) pp ON pp.idmatr = mm.idmatr
INNER JOIN matriculascurso mc ON mc.idmatr = mm.idmatr
WHERE pp.idusua IS NULL
`
const baseCursosQuery = `SELECT 
  cc.descur
FROM usuarioscurso uc
INNER JOIN cursos cc ON cc.idcurs = uc.idcurs
`
// matriculas
export const matriculas = async (context) => {
  let query = baseMatriculasQuery
  let binds = {}

  binds.idusua = context.IDUSUA
  if (context.STAMAT) {
    binds.stamat = context.STAMAT
    query += `AND mm.stamat = :stamat`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}

// cursos
export const cursos = async (context) => {
  let query = baseCursosQuery
  let binds = {}

  if (context.IDUSUA) {
    binds.idusua = context.IDUSUA
    query += `WHERE cc.idusua = :idusua`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
