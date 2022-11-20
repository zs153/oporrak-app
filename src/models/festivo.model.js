import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const festivoSql = `SELECT 
  idfest,
  TO_CHAR(fecfes, 'YYYY-MM-DD') "FECFES",
  tipfes,
FROM festivos
WHERE TRUNC(fecfes) = TO_DATE(:fecfes, 'YYYY-MM-DD')
`
const festivosOficinaSql = `SELECT 
  ff.idfest,
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') "FECFES",
  ff.ofifes,
  oo.desofi
FROM festivos ff
LEFT JOIN oficinas oo ON oo.idofic = ff.ofifes
WHERE (ff.ofifes = :ofifes OR
    ff.ofifes = 0) AND
  fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
`
const festivosLocalSql = `SELECT 
  ff.idfest,
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') "FECFES",
  ff.ofifes,
  oo.desofi
FROM festivos ff
LEFT JOIN oficinas oo ON oo.idofic = ff.ofifes
WHERE ff.ofifes = :ofifes AND
  fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
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
  let query = festivoSql

  const result = await simpleExecute(query, context)
  return result.rows
}
export const findAll = async (context) => {
  let query = festivosComunesSql

  const result = await simpleExecute(query, context)

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

  const result = await simpleExecute(query, context)

  return result.rows
}
