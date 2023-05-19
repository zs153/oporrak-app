import { simpleExecute } from '../services/database.js'

const baseMatriculasQuery = "SELECT mm.* FROM matriculas mm WHERE mm.idmatr NOT IN (SELECT idmatr FROM usuariosmatricula WHERE idusua = :idusua) AND sysdate BETWEEN mm.inimat AND mm.finmat"
const baseCursosQuery = "SELECT cc.descur,cc.notcur FROM usuarioscurso uc INNER JOIN cursos cc ON cc.idcurs = uc.idcurs"

// matriculas
export const findM = async (context) => {
  // bind
  let query = baseMatriculasQuery;
  const bind = context

  if (context.STAMAT) {
    query += "AND mm.stamat = :stamat"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}

// cursos
export const findC = async (context) => {
  // bind
  let query = baseCursosQuery;
  const bind = context;
  
  if (context.IDUSUA) {
    query += " AND uc.idusua = :idusua"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
