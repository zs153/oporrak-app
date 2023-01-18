import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseSql = `SELECT 
  mm.idmatr,
  mm.desmat,
  TO_CHAR(mm.inimat, 'YYYY-MM-DD') AS INIMAT,
  TO_CHAR(mm.finmat, 'YYYY-MM-DD') AS FINMAT,
  mm.idcurs,
  mm.stamat,
  cc.descur,
  TO_CHAR(mm.inimat, 'DD/MM/YYYY') AS STRINI,
  TO_CHAR(mm.finmat, 'DD/MM/YYYY') AS STRFIN
FROM matriculas mm
INNER JOIN cursos cc ON cc.idcurs = mm.idcurs
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTMATRICULA(
  :desmat,
  TO_DATE(:inimat, 'YYYY-MM-DD'),
  TO_DATE(:finmat, 'YYYY-MM-DD'),
  :idcurs,
  :stamat,
  :usumov,
  :tipmov,
  :idmatr
); END;
`
const updateSql = `BEGIN OPORRAK_PKG.UPDATEMATRICULA(
  :idmatr,
  :desmat,
  TO_DATE(:inimat, 'YYYY-MM-DD'),
  TO_DATE(:finmat, 'YYYY-MM-DD'),
  :idcurs,
  :stamat,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETEMATRICULA(
  :idmatr,
  :usumov,
  :tipmov 
); END;
`
const cambioSql = `BEGIN OPORRAK_PKG.CAMBIOESTADOMATRICULA(
  :idmatr,
  :stamat,
  :usumov,
  :tipmov 
); END;
`
const usuariosMatriculaSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuariosmatricula um ON um.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
WHERE um.idmatr = :idmatr
`
const usuariosPendientesSql = `SELECT 
  uu.idusua, uu.nomusu, oo.desofi FROM usuarios uu
LEFT JOIN usuariosmatricula um ON uu.idusua = um.idusua AND
  um.idmatr= :idmatr
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
WHERE um.idusua IS NULL AND 
  uu.stausu = 1
ORDER BY oo.idofic, uu.nomusu
`
const insertUsuarioSql = `BEGIN OPORRAK_PKG.INSERTUSUARIOMATRICULA(
  :idmatr,
  :arrusu,
  :usumov,
  :tipmov
); END;
`
const removeUsuarioSql = `BEGIN OPORRAK_PKG.DELETEUSUARIOMATRICULA(
  :idmatr,
  :idusua,
  :usumov,
  :tipmov
); END;
`

// matriculas
export const find = async (context) => {
  let query = baseSql
  let binds = {}

  if (context.IDMATR) {
    binds.idmatr = context.IDMATR
    query += `WHERE mm.idmatr = :idmatr`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const insert = async (bind) => {
  bind.IDMATR = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.IDMATR = await result.outBinds.IDMATR
  } catch (error) {
    bind = null
  }

  return bind
}
export const update = async (bind) => {
  let result

  try {
    await simpleExecute(updateSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const remove = async (bind) => {
  let result

  try {
    await simpleExecute(removeSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const change = async (bind) => {
  let result

  try {
    await simpleExecute(cambioSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// usuarios
export const usuariosMatricula = async (context) => {
  let result
  let query = usuariosMatriculaSql

  try {
    result = await simpleExecute(query, context)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const usuariosPendientes = async (context) => {
  let result
  let query = usuariosPendientesSql

  try {
    result = await simpleExecute(query, context)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const insertUsuario = async (bind) => {
  let result

  try {
    await simpleExecute(insertUsuarioSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return bind
}
export const removeUsuario = async (bind) => {
  let result
  try {
    await simpleExecute(removeUsuarioSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
