import { BIND_OUT, NUMBER } from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = "SELECT idesta,fecest,usuest,tipest,ofiest,deshor,hashorFROM estados"
const estadosFechaTipoQuery = "SELECT uu.nomusu,uu.userid,uu.telusu, oo.desofi,LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(p1.deshor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(p1.deshor))), 2, '0') DESHOR,LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(p1.hashor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(p1.hashor))), 2, '0') HASHOR, CASE WHEN uu.rolusu = 2 THEN uu.perusu -1 ELSE uu.perusu END PERROL, CASE WHEN p1.usuest IS NULL THEN 1 ELSE 2 END TIPEST FROM (SELECT ee.usuest,ee.deshor,ee.hashor FROM estados ee WHERE ee.fecest = TO_DATE(:fecest,'YYYY-MM-DD') AND ee.tipest <> :tipest) p1 RIGHT JOIN usuarios uu ON uu.idusua = p1.usuest INNER JOIN oficinas oo ON idofic = uu.ofiusu WHERE uu.stausu = 1 ORDER BY PERROL, uu.ofiusu, uu.userid, p1.deshor"
const estadosFechaUsuarioQuery = "SELECT idesta,TO_CHAR(fecest, 'YYYY-MM-DD') FECEST,usuest,tipest,ofiest,deshor,hashor FROM estados WHERE usuest = :usuest AND fecest = TO_DATE(:fecest, 'YYYY-MM-DD')"
const estadosUsuarioQuery = "SELECT ee.idesta,TO_CHAR(ee.fecest, 'YYYY-MM-DD') STRFEC,ee.usuest,ee.tipest,ee.ofiest,oo.desofi,LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(deshor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(deshor))), 2, '0') DESHOR,LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(hashor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(hashor))), 2, '0') HASHOR FROM estados ee INNER JOIN oficinas oo ON oo.idofic = ee.ofiest WHERE ee.usuest = :usuest AND ee.fecest BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')"
const estadosOficinaPerfilQuery = "SELECT t1.ofiusu,t1.idusua,TO_CHAR(t1.fecha, 'YYYY-MM-DD') FECHA,t1.tipest,t1.deshor,t1.hashor,uu.nomusu,oo.desofi FROM (SELECT p1.ofiusu,p1.idusua,p1.fecha,p1.tipest,'08:30' AS DESHOR,'14:00' AS HASHOR FROM (WITH vDates AS (SELECT TO_DATE(:desde, 'YYYY-MM-DD') + ROWNUM - 1 AS fecha FROM dual CONNECT BY rownum <= TO_DATE(:hasta, 'YYYY-MM-DD') - TO_DATE(:desde, 'YYYY-MM-DD') + 1) SELECT ofiusu, idusua, tipest, v.fecha FROM vDates v CROSS JOIN (SELECT uu.ofiusu, uu.idusua, 1 AS TIPEST FROM usuarios uu WHERE uu.stausu = 1 AND uu.perusu = :perusu UNION SELECT DISTINCT ee.ofiest, ee.usuest, 0 AS TIPEST FROM estados ee INNER JOIN usuarios uu ON uu.idusua = ee.usuest WHERE uu.perusu = :perusu AND ee.tipest = 10 AND ee.fecest BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD'))) p1 UNION SELECT ee.ofiest,ee.usuest,ee.fecest,ee.tipest,LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(deshor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(deshor))), 2, '0') DESHOR,LPAD(EXTRACT(HOUR FROM (TO_DSINTERVAL(hashor))), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM (TO_DSINTERVAL(hashor))), 2, '0') HASHOR FROM estados ee INNER JOIN usuarios uu ON uu.idusua = ee.usuest WHERE uu.perusu = :perusu AND uu.stausu = 1 AND ee.fecest BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')) t1 INNER JOIN usuarios uu ON uu.idusua = t1.idusua INNER JOIN oficinas oo ON oo.idofic = t1.ofiusu"
const insertSql = "BEGIN OPORRAK_PKG.INSERTESTADO(TO_DATE(:fecest, 'YYYY-MM-DD'),:usuest,:tipest,:ofiest,:deshor,:hashor,:usumov,:tipmov,:idesta); END;"
const updateSql = "BEGIN OPORRAK_PKG.UPDATEESTADOS(:arrest,:usumov,:tipmov,:tipmoz); END;"
const removeSql = "BEGIN OPORRAK_PKG.DELETEESTADO(:idesta,:usumov,:tipmov ); END;"
const insertTraspasoSql = "BEGIN OPORRAK_PKG.INSERTTRASPASO(TO_DATE(:fecest, 'YYYY-MM-DD'),:usuest,:tipest,:ofiest,:deshor,:hashor,:tiptra,:ofitra,:usumov,:tipmov,:idesta,:idtras); END;"
const updateTraspasoSql = "BEGIN OPORRAK_PKG.UPDATETRASPASOS(:arrtra,:usumov,:tipmov,:tipmoz); END;"
const removeTraspasoSql = "BEGIN OPORRAK_PKG.DELETETRASPASO(:idesta,:usuest,TO_DATE(:fecest,'YYYY-MM-DD'),:tipest,:usumov,:tipmov ); END;"

// estados
export const find = async (context) => {
  // bind
  let query = baseQuery
  let bind = context

  if (context.IDESTA) {
    query += " WHERE idesta = :idesta"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insert = async (context) => {
  // bind
  let bind = context
  bind.IDESTA = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDESTA = ret.outBinds.IDESTA
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const update = async (context) => {  
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const remove = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}

// traspaso
export const insertTraspaso = async (context) => {  
  // bind
  let bind = context
  bind.IDESTA = {
    dir: BIND_OUT,
    type: NUMBER,
  }
  bind.IDTRAS = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertTraspasoSql, bind)

  if (ret) {
    bind.IDESTA = ret.outBinds.IDESTA
    bind.IDTRAS = await result.outBinds.IDTRAS
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const updateTraspaso = async (context) => {
  // bind
  let bind = context
  // proc
  const ret = await simpleExecute(updateTraspasoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const removeTraspaso = async (context) => {
  // bind
  let bind = context
  // proc
  const ret = await simpleExecute(removeTraspasoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}

// usuarios
export const estadosUsuario = async (context) => {
  // bind
  let query = estadosUsuarioQuery
  const bind = context

  if (context.TIPEST) {
    query += " AND tipest = :tipest"
  }
  
  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const estadosFechaUsuario = async (context) => {
  // bind
  const query = estadosFechaUsuarioQuery
  const bind = context

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const estadosFechaTipo = async (context) => {
  // bind
  const query = estadosFechaTipoQuery
  const bind = context

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const estadosOficinaPerfil = async (context) => {
  // bind
  let query = estadosOficinaPerfilQuery
  const bind = context

  if (context.OFIEST) {
    query += " WHERE t1.ofiusu = :ofiest ORDER BY t1.ofiusu, t1.idusua, t1.fecha, t1.tipest"
  } else {
    query += " WHERE SUBSTR(oo.codofi, 1, 1) = 'D' ORDER BY t1.ofiusu, t1.idusua, t1.fecha, t1.tipest"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  console.log(ret.rows);
  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
