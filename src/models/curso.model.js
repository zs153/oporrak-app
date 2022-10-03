import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idcurs,
  descur,
  stacur
FROM cursos
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTCURSO(
  :descur,
  :stacur,
  :usumov,
  :tipmov,
  :idcurs
); END;
`
const updateSql = `BEGIN OPORRAK_PKG.UPDATECURSO(
  :idcurs,
  :descur,
  :stacur,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETECURSO(
  :idcurs,
  :usumov,
  :tipmov 
); END;
`
const cambioSql = `BEGIN OPORRAK_PKG.CAMBIOESTADOCURSO(
  :idcurs,
  :stacur,
  :usumov,
  :tipmov 
); END;
`
const turnosCursoSql = `SELECT 
  tt.idturn,
  tt.destur,
  TO_CHAR(tt.initur, 'DD/MM/YYYY') "STRINI",
  TO_CHAR(tt.fintur, 'DD/MM/YYYY') "STRFIN",
  LPAD(EXTRACT(HOUR FROM tt.inihor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.inihor), 2, '0') AS "INIHOR",
  LPAD(EXTRACT(HOUR FROM tt.finhor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.finhor), 2, '0') AS "FINHOR",
  tt.loctur
FROM turnos tt
INNER JOIN turnoscurso tc ON tc.idturn = tt.idturn
WHERE tc.idcurs = :idcurs
`
const insertTurnoSql = `BEGIN OPORRAK_PKG.INSERTTURNOCURSO(
  :idcurs,
  :destur,
  TO_DATE(:initur,'YYYY-MM-DD'),
  TO_DATE(:fintur,'YYYY-MM-DD'),
  :inihor,
  :finhor,
  :loctur,
  :usumov,
  :tipmov,
  :idturn
); END;
`
const updateTurnoSql = `BEGIN OPORRAK_PKG.UPDATETURNOCURSO(
  :idcurs,
  :idturn,
  :destur,
  TO_DATE(:initur,'YYYY-MM-DD'),
  TO_DATE(:fintur,'YYYY-MM-DD'),
  :inihor,
  :finhor,
  :loctur,
  :usumov,
  :tipmov
); END;
`
const removeTurnoSql = `BEGIN OPORRAK_PKG.DELETETURNOCURSO(
  :idcurs,
  :idturn,
  :usumov,
  :tipmov
); END;
`
const usuariosCursoSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuarioscurso uc ON uc.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
`
const usuariosPendientesSql = `SELECT uu.idusua, uu.nomusu, oo.desofi
FROM usuarios uu
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
INNER JOIN (
SELECT um.idusua FROM usuariosmatricula um
MINUS
SELECT uc.idusua FROM usuarioscurso uc WHERE uc.idcurs = :idcurs
) p1 ON p1.idusua = uu.idusua
`
const insertUsuarioSql = `BEGIN OPORRAK_PKG.INSERTUSUARIOCURSO(
  :idcurs,
  :arrusu,
  :usumov,
  :tipmov
); END;
`
const removeUsuarioSql = `BEGIN OPORRAK_PKG.DELETEUSUARIOCURSO(
  :idcurs,
  :idusua,
  :usumov,
  :tipmov
); END;
`

// cursos
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idcurs) {
    binds.idcurs = context.idcurs
    query += `WHERE idcurs = :idcurs`
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
  bind.idcurs = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idcurs = await result.outBinds.idcurs
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

// turnos
export const turnosCurso = async (context) => {
  let query = turnosCursoSql
  let binds = {}

  binds.idcurs = context.idcurs

  const result = await simpleExecute(query, binds)

  return result.rows
}
export const insertTurno = async (bind) => {
  bind.idturn = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertTurnoSql, bind)

    bind.idturn = await result.outBinds.idturn
  } catch (error) {
    bind = null
  }

  return bind
}
export const updateTurno = async (bind) => {
  let result

  try {
    await simpleExecute(updateTurnoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const removeTurno = async (bind) => {
  let result

  try {
    await simpleExecute(removeTurnoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// usuarios
export const usuariosCurso = async (context) => {
  let result
  let query = usuariosCursoSql
  let binds = {}

  if (context.idcurs) {
    binds.idcurs = context.idcurs
    query += `WHERE uc.idcurs = :idcurs
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
