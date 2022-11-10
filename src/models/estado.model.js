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
const estadosFechaPerfilQuery = `SELECT 
  p1.nomusu, p1.telusu, p1.PERROL, p1.tipest, oo.desofi 
FROM (
  SELECT uu.nomusu, uu.telusu, uu.ofiusu,
    CASE WHEN uu.rolusu = 2 THEN uu.perusu -1 ELSE uu.perusu END AS "PERROL",
    CASE WHEN zz.tipest IS NULL THEN 1 ELSE zz.tipest END AS "TIPEST"
    FROM (SELECT ee.usuest, ee.tipest
        FROM estados ee
        WHERE ee.fecest = TO_DATE(:fecest,'YYYY-MM-DD')
    ) zz
    RIGHT JOIN usuarios uu ON uu.idusua = zz.usuest
    WHERE uu.stausu = 1
) p1
INNER JOIN oficinas oo ON idofic = p1.ofiusu
ORDER BY p1.PERROL, p1.ofiusu
`
const estadosFechaUsuarioQuery = `SELECT 
  idesta,
  TO_CHAR(fecest, 'YYYY-MM-DD') "FECEST",
  usuest,
  tipest,
  ofiest,
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
  '08:30' AS "DESHOR", 
  '14:00' AS "HASHOR", 
  TO_CHAR(ff.fecfes, 'DD/MM/YYYY') AS "STRFEC"
FROM festivos ff
WHERE (ff.ofifes = 0 OR ff.ofifes = :idofic) AND
  ff.fecfes BETWEEN TO_DATE(:desde, 'DD/MM/YYYY') AND TO_DATE(:hasta, 'DD/MM/YYYY')
UNION
SELECT 
  ee.idesta,
  TO_CHAR(ee.fecest, 'YYYY-MM-DD') AS "FECEST", 
  ee.usuest,
  ee.tipest,
  ee.ofiest,
  LPAD(EXTRACT(HOUR FROM ee.deshor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM ee.deshor), 2, '0') AS "DESHOR",
  LPAD(EXTRACT(HOUR FROM ee.hashor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM ee.deshor), 2, '0') AS "HASHOR",
  TO_CHAR(ee.fecest, 'DD/MM/YYYY') AS "STRFEC"
FROM estados ee
WHERE ee.usuest = :usuest AND
  ee.ofiest = :idofic AND
  ee.fecest BETWEEN TO_DATE(:desde, 'DD/MM/YYYY') AND TO_DATE(:hasta, 'DD/MM/YYYY')
`
const estadosOficinaPerfilQuery = `SELECT t1.ofiusu, t1.idusua, 
  TO_CHAR(t1.fecha, 'YYYY-MM-DD') AS "FECHA", 
  t1.tipest, t1.deshor, t1.hashor, 
  uu.nomusu,
  oo.desofi 
FROM (
  SELECT
    p1.ofiusu, p1.idusua, p1.fecha, p1.tipest, 
    '08:30' AS "DESHOR", 
    '14:00' AS "HASHOR"
    FROM (
      WITH vDates AS (
          SELECT TO_DATE(:desde, 'YYYY-MM-DD') + ROWNUM - 1 AS fecha
          FROM dual
          CONNECT BY rownum <= TO_DATE(:hasta, 'YYYY-MM-DD') - TO_DATE(:desde, 'YYYY-MM-DD') + 1
      )
      SELECT ofiusu, idusua, tipest, v.fecha
      FROM vDates v
      CROSS JOIN (SELECT uu.ofiusu, uu.idusua, 1 AS "TIPEST" FROM usuarios uu 
        WHERE uu.stausu = 1 AND uu.perusu = :perusu
        UNION
        --usuarios traspasados
        SELECT DISTINCT ee.ofiest, ee.usuest, 0 AS "TIPEST" FROM estados ee
        INNER JOIN usuarios uu ON uu.idusua = ee.usuest
        WHERE uu.perusu = :perusu AND
          ee.tipest = 10 AND
          ee.fecest BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
      )
    ) p1
  UNION
  SELECT ee.ofiest, ee.usuest, ee.fecest, ee.tipest, 
    LPAD(EXTRACT(HOUR FROM ee.deshor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM ee.deshor), 2, '0') AS "DESHOR",
    LPAD(EXTRACT(HOUR FROM ee.hashor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM ee.deshor), 2, '0') AS "HASHOR"
  FROM estados ee  
  INNER JOIN usuarios uu ON uu.idusua = ee.usuest
  WHERE uu.perusu = :perusu AND
    ee.fecest BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
) t1
INNER JOIN usuarios uu ON uu.idusua = t1.idusua
INNER JOIN oficinas oo ON oo.idofic = t1.ofiusu
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTESTADO(
  TO_DATE(:fecest, 'DD/MM/YYYY'),
  :usuest,
  :tipest,
  :ofiest,
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
const insertTraspasoSql = `BEGIN OPORRAK_PKG.INSERTTRASPASO(
  TO_DATE(:fecest, 'DD/MM/YYYY'),
  :usuest,
  :tipest,
  :ofiest,
  :deshor,
  :hashor,
  :tiptra,
  :ofitra,
  :usumov,
  :tipmov,
  :idesta,
  :idtras
); END;
`
const removeTraspasoSql = `BEGIN OPORRAK_PKG.DELETETRASPASO(
  :idesta,
  :usuest,
  :fecest,
  :tipest,
  :usumov,
  :tipmov 
); END;
`
const insertRangoSql = `BEGIN OPORRAK_PKG.INSERTESTADORANGO(
  TO_DATE(:desde, 'YYYY-MM-DD'),
  TO_DATE(:hasta, 'YYYY-MM-DD'),
  :usuest,
  :tipest,
  :ofiest,
  :deshor,
  :hashor,
  :usumov,
  :tipmov,
  :idesta
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
export const insertRango = async (bind) => {
  bind.idesta = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }
  try {
    const result = await simpleExecute(insertRangoSql, bind)

    bind.idesta = await result.outBinds.idesta
  } catch (error) {
    bind = null
  }

  return bind
}

// traspaso
export const insertTraspaso = async (bind) => {
  bind.idesta = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }
  bind.idtras = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertTraspasoSql, bind)

    bind.idesta = await result.outBinds.idesta
    bind.idtras = await result.outBinds.idtras
  } catch (error) {
    bind = null
  }

  return bind
}
export const removeTraspaso = async (bind) => {
  let result

  try {
    await simpleExecute(removeTraspasoSql, bind)

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
export const estadosFechaPerfil = async (context) => {
  let query = estadosFechaPerfilQuery

  const result = await simpleExecute(query, context)

  return result.rows
}
export const estadosOficinaPerfil = async (context) => {
  let query = estadosOficinaPerfilQuery

  if (context.OFIEST === 0) {
    delete context.OFIEST
    query += `ORDER BY t1.ofiusu, t1.idusua, t1.fecha, t1.tipest`
  } else {
    query += `WHERE t1.ofiusu = :ofiest ORDER BY t1.ofiusu, t1.idusua, t1.fecha, t1.tipest`;
  }

  const result = await simpleExecute(query, context)

  return result.rows
}
