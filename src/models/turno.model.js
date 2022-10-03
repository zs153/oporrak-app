import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  idturn,
  destur,
  TO_CHAR(initur, 'YYYY-MM-DD') AS "INITUR",
  TO_CHAR(fintur, 'YYYY-MM-DD') AS "FINTUR",
  LPAD(EXTRACT(HOUR FROM inihor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM inihor), 2, '0') AS "INIHOR",
  LPAD(EXTRACT(HOUR FROM finhor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM finhor), 2, '0') AS "FINHOR",
  loctur
FROM turnos
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTTURNO(
  :destur,
  :initur,
  :fintur,
  :inihor,
  :finhor
  :loctur,
  :usumov,
  :tipmov
); END;
`
const updateSql = `BEGIN OPORRAK_PKG.UPDATETURNO(
  :idturn,
  :destur,
  :initur,
  :fintur,
  :inihor,
  :finhor,
  :loctur,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETETURNO(
  :idturn,
  :usumov,
  :tipmov 
); END;
`
const usuariosPendientesSql = `SELECT uu.idusua, uu.nomusu, oo.desofi
FROM usuarios uu
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
INNER JOIN (
  SELECT uc.idusua FROM usuarioscurso uc
  MINUS
  SELECT ut.idusua FROM usuariosturno ut WHERE ut.idturn = :idturn
) p1 ON p1.idusua = uu.idusua
`
const insertUsuarioSql = `BEGIN OPORRAK_PKG.INSERTUSUARIOTURNO(
  :idturn,
  :arrusu,
  :usumov,
  :tipmov
); END;
`
const removeUsuarioSql = `BEGIN OPORRAK_PKG.DELETEUSUARIOTURNO(
  :idturn,
  :idusua,
  :usumov,
  :tipmov
); END;
`
const usuariosTurnoSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuariosturno ut ON ut.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
WHERE ut.idturn = :idturn
ORDER BY uu.nomusu
`
const turnoCursoSql = `SELECT 
  cc.idcurs,
  cc.descur,
  tt.idturn,
  tt.destur
FROM turnoscurso tc
INNER JOIN cursos cc ON cc.idcurs = tc.idcurs
INNER JOIN turnos tt ON tt.idturn = tc.idturn
WHERE tc.idcurs = :idcurs AND tc.idturn = :idturn
`

// turnos
export const find = async (context) => {
  let query = baseQuery
  let binds = {}

  if (context.idturn) {
    binds.idturn = context.idturn
    query += `WHERE idturn = :idturn`
  }

  const result = await simpleExecute(query, binds)
  return result.rows
}
export const findAll = async (context) => {
  let query = baseQuery
  let binds = {}

  const result = await simpleExecute(query, binds)

  return result.rows
}
export const insert = async (bind) => {
  bind.idturn = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertSql, bind)

    bind.idturn = await result.outBinds.idturn
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
export const usuariosTurno = async (context) => {
  let result
  let query = usuariosTurnoSql

  try {
    result = await simpleExecute(query, context)
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

// turnos curso
export const turnoCurso = async (context) => {
  let result
  let query = turnoCursoSql

  try {
    result = await simpleExecute(query, context)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const usuariosCurso = async (context) => {
  let result
  let query = usuariosCursoSql

  try {
    result = await simpleExecute(query, context)
  } catch (error) {
    result = null
  }

  return result.rows
}