import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const festivosSql = `SELECT 
  idfest,
  TO_CHAR(fecfes, 'YYYY-MM-DD') "FECFES",
  ofifes
FROM festivos
WHERE fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
`
const festivosOficinaSql = `SELECT 
  ff.idfest,
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') "FECFES",
  ff.ofifes
FROM festivos ff
WHERE (ff.ofifes = :ofifes OR ff.ofifes = 0) AND
  fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
`
const festivosLocalSql = `SELECT 
  ff.idfest,
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') "FECFES",
  ff.ofifes
FROM festivos ff
WHERE ff.ofifes > 0 AND
  ff.fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTFESTIVO(
  TO_DATE(:fecfes, 'YYYY-MM-DD'),
  :ofifes,
  :usumov,
  :tipmov,
  :idfest
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETEFESTIVO(
  :idfest,
  :ofifes,
  :usumov,
  :tipmov
); END;
`

// festivos
export const find = async (context) => {
  const query = festivosSql
  const binds = {
    desde: context.DESDE,
    hasta: context.HASTA,
  }
  if (context.OFIFES) {
    binds.ofifes = context.OFIFES
    query += `AND ofifes = :ofifes`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const insert = async (bind) => {
  bind.idfest = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idfest = await result.outBinds.idfest
  } catch (error) {
    bind = null
  }

  return bind
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

// oficinas
export const festivosOficina = async (context) => {
  let query = festivosOficinaSql

  const result = await simpleExecute(query, context)

  return result.rows
}
export const festivosLocal = async (context) => {
  let query = festivosLocalSql
  const binds = {
    desde: context.DESDE,
    hasta: context.HASTA,
  }

  if (context.OFIFES !== 0) {
    binds.ofifes = context.OFIFES
    query += `AND ff.ofifes = :ofifes`
  }

  const result = await simpleExecute(query, binds)

  return result.rows
}
