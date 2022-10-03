import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idmatr,
  desmat,
  inimat,
  finmat,
  idcurs,
  stamat
FROM cursos
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTMATRICULA(
  :desmat,
  :inimat,
  :finmat,
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
  :inimat,
  :finmat,
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

// matriculas
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idmatr) {
    binds.idmatr = context.idmatr
    query += `WHERE idmatr = :idmatr`
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
