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
  AND sysdate BETWEEN mm.inimat AND mm.finmat
`
const baseCursosQuery = `SELECT 
  cc.descur
FROM usuarioscurso uc
INNER JOIN cursos cc ON cc.idcurs = uc.idcurs
`
// matriculas
export const findM = async (context) => {
  // bind
  let query = baseMatriculasQuery;
  let bind = {};

  if (context.IDUSUA) {
    bind.IDUSUA = context.IDUSUA;
  } else if (context.STAMAT) {
    bind.STAMAT = context.STAMAT
    query += `AND mm.stamat = : stamar `
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
}

// cursos
export const findC = async (context) => {
  // bind
  let query = baseCursosQuery;
  let bind = context;

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
}
