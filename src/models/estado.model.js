import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idesta,
  TO_CHAR(fecest, 'YYYY-MM-DD') "FECEST",
  usuest,
  tipest,
  ofiest,
  ofides,
  deshor,
  hashor,
  TO_CHAR(fecest, 'DD/MM/YYYY') "STRFEC"
FROM estados
`
const estadosFechaUsuarioQuery = `SELECT 
  idesta,
  TO_CHAR(fecest, 'YYYY-MM-DD') "FECEST",
  usuest,
  tipest,
  ofiest,
  ofides,
  deshor,
  hashor,
  TO_CHAR(fecest, 'DD/MM/YYYY') "STRFEC"
FROM estados
WHERE usuest = :usuest AND
  fecest = TO_DATE(:fecest, 'DD/MM/YYYY')
`
const estadosUsuarioQuery = `SELECT 
  0 AS "IDESTA", 
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') AS "FECEST", 
  0 AS "USUEST", 
  0 AS "TIPEST", 
  0 AS "OFIEST", 
  0 AS "OFIDES",
  '08:30' AS "DESHOR", 
  '14:00' AS "HASHOR", 
  TO_CHAR(ff.fecfes, 'DD/MM/YYYY') AS "STRFEC"
FROM festivos ff
WHERE (ff.ofifes = 0 OR ff.ofifes = :idofic) AND
  TRUNC(ff.fecfes) BETWEEN :desde AND :hasta
UNION
SELECT 
  ee.idesta,
  TO_CHAR(ee.fecest, 'YYYY-MM-DD') AS "FECEST", 
  ee.usuest,
  ee.tipest,
  ee.ofiest,
  ee.ofides,
  LPAD(EXTRACT(HOUR FROM ee.deshor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM ee.deshor), 2, '0') AS "DESHOR",
  LPAD(EXTRACT(HOUR FROM ee.hashor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM ee.deshor), 2, '0') AS "HASHOR",
  TO_CHAR(ee.fecest, 'DD/MM/YYYY') AS "STRFEC"
FROM estados ee
WHERE ee.usuest = :usuest AND
  ee.fecest BETWEEN TO_DATE(:desde, 'DD/MM/YYYY') AND TO_DATE(:hasta, 'DD/MM/YYYY')
`
const estadosOficinaPerfilQuery = `SELECT 
  ee.idesta,
  TO_CHAR(ee.fecest, 'YYYY-MM-DD') "FECEST",
  ee.usuest,
  ee.tipest,
  ee.ofiest,
  ee.ofides,
  ee.deshor,
  ee.hashor
FROM estados ee
INNER JOIN usuarios uu ON uu.idusua = ee.usuest
INNER JOIN oficinas oo ON oo.idofic = ee.ofiest
WHERE ee.ofiest = :ofiest AND
  uu.perusu = :perusu AND
  TRUNC(ee.fecest) BETWEEN :desde AND :hasta
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTESTADO(
  TO_DATE(:fecest, 'DD/MM/YYYY'),
  :usuest,
  :tipest,
  :ofiest,
  :ofides,
  :deshor,
  :hashor,
  :usumov,
  :tipmov,
  :idesta
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

  if (context.tipest === 0) {
    delete context.tipest
  } else {
    query += `AND ee.tipest = :tipest`;
  }

  const result = await simpleExecute(query, context)

  return result.rows
}
export const estadosFechaUsuario = async (context) => {
  let query = estadosFechaUsuarioQuery

  const result = await simpleExecute(query, context)

  return result.rows
}