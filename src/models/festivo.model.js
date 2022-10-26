import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const festivoSql = `SELECT 
  idfest,
  TO_CHAR(fecfes, 'YYYY-MM-DD') "FECFES",
  tipfes,
  TO_CHAR(fecfes, 'DD/MM/YYYY') "STRFES"
FROM festivos
WHERE TRUNC(fecfes) = TO_DATE(:fecfes, 'DD/MM/YYYY')
`
const festivosSql = `SELECT 
  idfest,
  TO_CHAR(fecfes, 'YYYY-MM-DD') "FECFES",
  tipfes,
  TO_CHAR(fecfes, 'DD/MM/YYYY') "STRFES"
FROM festivos
`
const festivosOficinaSql = `SELECT 
  ff.idfest,
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') "FECFES",
  ff.tipfes,
  TO_CHAR(ff.fecfes, 'DD/MM/YYYY') "STRFES",
  oo.idofic,
  oo.desofi
FROM festivosoficina fo
INNER JOIN festivos ff ON ff.idfest = fo.idfest
INNER JOIN oficinas oo ON oo.idofic = fo.idofic
WHERE fo.idofic = :idofic AND
  TRUNC(ff.fecfes) BETWEEN :desde AND :hasta
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTFESTIVO(
  :idofic,  
  TO_DATE(:fecfes, 'DD/MM/YYYY'),
  :tipfes,
  :usumov,
  :tipmov,
  :idfest
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETEFESTIVO(
  :idofic,
  TO_DATE(:fecfes, 'DD/MM/YYYY'),
  :tipfes,
  :usumov,
  :tipmov
); END;
`

// estados
export const find = async (context) => {
  let query = festivoSql

  const result = await simpleExecute(query, context)
  return result.rows
}
export const findAll = async () => {
  let query = festivosSql
  let bind = {}

  const result = await simpleExecute(query, bind)
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
