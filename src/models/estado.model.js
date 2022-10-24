import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idesta,
  TO_CHAR(fecest, 'YYYY-MM-DD') "FECEST",
  usuest,
  tipest,
  ofiest,
  deshor,
  hashor,
  TO_CHAR(fecest, 'DD/MM/YYYY') "STRFEC"
FROM estados
`
const estadosUsuarioQuery = `SELECT 
  ee.idesta,
  ee.fecest,
  ee.usuest,
  ee.tipest,
  ee.ofiest,
  LPAD(EXTRACT(HOUR FROM ee.deshor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM ee.deshor), 2, '0') AS "DESHOR",
  LPAD(EXTRACT(HOUR FROM ee.hashor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM ee.deshor), 2, '0') AS "HASHOR"
FROM estados ee
WHERE ee.usuest = :usuest AND
    ee.tipest = :tipest AND
    ee.fecest BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTESTADO(
  TO_DATE(:fecest, 'YYYY-MM-DD'),
  :usuest,
  :tipest,
  :ofiest,
  :inihor,
  :finhor,
  :usumov,
  :tipmov,
  :idesta
); END;
`
const updateSql = `BEGIN OPORRAK_PKG.UPDATEESTADO(
  :idesta,
  TO_DATE(:fecest, 'YYYY-MM-DD'),
  :usuest,
  :tipest,
  :ofiest,
  :inihor,
  :finhor,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETEESTADO(
  :idesta,
  :usumov,
  :tipmov 
); END;
`

// estados
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idesta) {
    binds.idesta = context.idesta
    query += `WHERE idesta = :idesta`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = baseQuery

  const result = await simpleExecute(query, context)
  return result.rows
}
export const insert = async (bind) => {
  bind.idesta = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idesta = await result.outBinds.idesta
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

// usuarios
export const estadosUsuario = async (context) => {
  let query = estadosUsuarioQuery
  console.log(query, context)
  const result = await simpleExecute(query, context)

  return result.rows
}
