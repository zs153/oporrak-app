import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
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
`
const usuariosPendientesSql = `SELECT uu.idusua, uu.nomusu, oo.desofi
FROM usuarios uu
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
INNER JOIN (
SELECT uu.idusua FROM usuarios uu
MINUS
SELECT um.idusua FROM usuariosmatricula um WHERE um.idmatr = :idmatr
) p1 ON p1.idusua = uu.idusua
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
  let query = baseQuery
  let binds = {}

  if (context.idmatr) {
    binds.idmatr = context.idmatr
    query += `WHERE mm.idmatr = :idmatr`
  }

  const result = await simpleExecute(query, binds)

  return result.rows
}
export const findAll = async () => {
  let query = baseQuery
  let binds = {}

  const result = await simpleExecute(query, binds)

  return result.rows
}
export const insert = async (bind) => {
  bind.idmatr = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idmatr = await result.outBinds.idmatr
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
  let binds = {}

  if (context.idcurs) {
    binds.idcurs = context.idcurs
    query += `WHERE um.idmatr = :idmatr
    ORDER BY uu.nomusu
    `
  }
  try {
    result = await simpleExecute(query, binds)
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
console.log(insertUsuarioSql,bind)
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
