import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idesta,
  fecest,
  usuest,
  tipest,
  ofiest,
  deshor,
  hashor
FROM estados
`
const estadosFechaPerfilQuery = `SELECT
  uu.nomusu, uu.userid, uu.telusu, oo.desofi,
  CASE WHEN uu.rolusu = 2 THEN uu.perusu -1 ELSE uu.perusu END "PERROL",
  CASE WHEN p1.usuest IS NULL THEN 1 ELSE 2 END "TIPEST"
FROM (SELECT 
  ee.usuest
  FROM estados ee
  WHERE ee.fecest = TO_DATE(:fecest,'YYYY-MM-DD')
  GROUP BY ee.usuest
) p1
RIGHT JOIN usuarios uu ON uu.idusua = p1.usuest
INNER JOIN oficinas oo ON idofic = uu.ofiusu
WHERE uu.stausu = 1
ORDER BY PERROL, uu.ofiusu
`
const estadosFechaUsuarioQuery = `SELECT 
  idesta,
  TO_CHAR(fecest, 'YYYY-MM-DD') "FECEST",
  usuest,
  tipest,
  ofiest,
  deshor,
  hashor
FROM estados
WHERE usuest = :usuest AND
  fecest = TO_DATE(:fecest, 'YYYY-MM-DD')
`
const estadosUsuarioQuery = `SELECT 
  ee.idesta,
  TO_CHAR(ee.fecest, 'YYYY-MM-DD') STRFEC,
  ee.usuest,
  ee.tipest,
  ee.ofiest,
  LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(deshor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(deshor))), 2, '0') "DESHOR",
  LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(hashor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(hashor))), 2, '0') "HASHOR"
FROM estados ee
WHERE ee.usuest = :usuest AND
  ee.ofiest = :idofic AND
  ee.fecest BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
UNION
SELECT 
  0 AS "IDESTA", 
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') STRFEC,
  0 AS "USUEST", 
  0 AS "TIPEST", 
  0 AS "OFIEST", 
  '08:30' AS "DESHOR", 
  '14:00' AS "HASHOR"
FROM festivos ff
WHERE (ff.ofifes = 0 OR ff.ofifes = :idofic) AND
  ff.fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
`
const estadosOficinaPerfilQuery = `SELECT 
  t1.ofiusu, t1.idusua, t1.fecha, t1.tipest, t1.deshor, t1.hashor, 
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
    LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(deshor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(deshor))), 2, '0') "DESHOR",
    LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(hashor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(hashor))), 2, '0') "HASHOR"
  FROM estados ee  
  INNER JOIN usuarios uu ON uu.idusua = ee.usuest
  WHERE uu.perusu = :perusu AND
    uu.stausu = 1 AND
    ee.fecest BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
) t1
INNER JOIN usuarios uu ON uu.idusua = t1.idusua
INNER JOIN oficinas oo ON oo.idofic = t1.ofiusu
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTESTADO(
  TO_DATE(:fecest, 'YYYY-MM-DD'),
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
  TO_DATE(:fecest, 'YYYY-MM-DD'),
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
  TO_DATE(:fecest,'YYYY-MM-DD'),
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
    query += `WHERE SUBSTR(oo.codofi, 1, 1) = 'D'
      ORDER BY t1.ofiusu, t1.idusua, t1.fecha, t1.tipest`
  } else {
    query += `WHERE t1.ofiusu = :ofiest
      ORDER BY t1.ofiusu, t1.idusua, t1.fecha, t1.tipest`
  }

  const result = await simpleExecute(query, context)

  return result.rows
}
