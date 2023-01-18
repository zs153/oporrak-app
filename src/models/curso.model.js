import oracledb from 'oracledb'
import { simpleExecute } from '../services/database.js'

const cursoSql = `SELECT 
  cc.*
FROM cursos cc
`
const cursosSql = `SELECT 
  idcurs,
  descur,
  stacur
FROM cursos
ORDER BY descur
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTCURSO(
  :descur,
  :durcur,
  :poncur,
  :stacur,
  :usumov,
  :tipmov,
  :idcurs
); END;
`
const updateSql = `BEGIN OPORRAK_PKG.UPDATECURSO(
  :idcurs,
  :descur,
  :durcur,
  :poncur,
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
// turnos
const turnoSql = `SELECT 
  tt.idturn,
  tt.destur,
  TO_CHAR(tt.initur, 'DD/MM/YYYY') "STRINI",
  TO_CHAR(tt.fintur, 'DD/MM/YYYY') "STRFIN",
  LPAD(EXTRACT(HOUR FROM tt.inihor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.inihor), 2, '0') AS "INIHOR",
  LPAD(EXTRACT(HOUR FROM tt.finhor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.finhor), 2, '0') AS "FINHOR",
  tt.loctur
FROM turnos tt
INNER JOIN turnoscurso tc ON tc.idturn = tt.idturn
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
// matricula
const matriculaSql = `SELECT 
  mm.idmatr,
  mm.desmat,
  TO_CHAR(mm.inimat, 'YYYY-MM-DD') "INIMAT",
  TO_CHAR(mm.finmat, 'YYYY-MM-DD') "FINMAT",
  mm.stamat
FROM matriculas mm
INNER JOIN matriculascurso mc ON mc.idmatr = mm.idmatr
`
const insertMatriculaSql = `BEGIN OPORRAK_PKG.INSERTMATRICULACURSO(
  :idcurs,
  :desmat,
  TO_DATE(:inimat,'YYYY-MM-DD'),
  TO_DATE(:finmat,'YYYY-MM-DD'),
  :idcurs,
  :stamat,
  :usumov,
  :tipmov,
  :idmatr
); END;
`
const updateMatriculaSql = `BEGIN OPORRAK_PKG.UPDATEMATRICULACURSO(
  :idcurs,
  :idmatr,
  :desmat,
  TO_DATE(:inimat,'YYYY-MM-DD'),
  TO_DATE(:finmat,'YYYY-MM-DD'),
  :idcurs,
  :stamat,
  :usumov,
  :tipmov
); END;
`
const removeMatriculaSql = `BEGIN OPORRAK_PKG.DELETEMATRICULACURSO(
  :idcurs,
  :idmatr,
  :usumov,
  :tipmov
); END;
`
// usuarios
const usuariosSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuarioscurso uc ON uc.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
WHERE uc.idcurs = :idcurs
ORDER BY uu.nomusu
`
const usuariosPendientesSql = `SELECT 
  uu.idusua, uu.nomusu, oo.desofi 
FROM usuariosmatricula um
LEFT JOIN usuarioscurso uc ON uc.idusua = um.idusua AND
  uc.idcurs= :idcurs
INNER JOIN usuarios uu ON uu.idusua = um.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
WHERE um.idmatr = :idmatr
ORDER BY oo.idofic
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
// usuarios turno
const usuariosTurnoSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuariosturno ut ON ut.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
WHERE ut.idturn = :idturn
`
const usuariosTurnoPendientesSql = `SELECT 
  uu.idusua, 
  uu.nomusu, 
  oo.idofic,
  oo.desofi
FROM usuarios uu
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
INNER JOIN (
SELECT uc.idusua FROM usuarioscurso uc
WHERE uc.idcurs = :idcurs
MINUS
SELECT ut.idusua FROM usuariosturno ut 
INNER JOIN turnoscurso tc ON tc.idturn = ut.idturn
WHERE tc.idcurs = :idcurs
) p1 ON p1.idusua = uu.idusua
`
const insertUsuarioTurnoSql = `BEGIN OPORRAK_PKG.INSERTUSUARIOTURNO(
  :idturn,
  :arrusu,
  :usumov,
  :tipmov
); END;
`
const removeUsuarioTurnoSql = `BEGIN OPORRAK_PKG.DELETEUSUARIOTURNO(
  :idturn,
  :idusua,
  :usumov,
  :tipmov
); END;
`
// usuarios matricula
const usuariosMatriculaSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuariosmatricula um ON um.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
WHERE um.idmatr = :idmatr
`
const insertUsuarioMatriculaSql = `BEGIN OPORRAK_PKG.INSERTUSUARIOMATRICULA(
  :idmatr,
  :arrusu,
  :usumov,
  :tipmov
); END;
`
const removeUsuarioMatriculaSql = `BEGIN OPORRAK_PKG.DELETEUSUARIOMATRICULA(
  :idmatr,
  :idusua,
  :usumov,
  :tipmov
); END;
`

// cursos
export const find = async (context) => {
  let query = cursoSql
  let binds = {}

  if (context.IDCURS) {
    binds.idcurs = context.IDCURS
    query += `WHERE cc.idcurs = :idcurs`
  }

  const result = await simpleExecute(query, context)
  return result.rows
}
export const insert = async (bind) => {
  bind.IDCURS = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  console.log(insertSql, bind)
  try {
    const result = await simpleExecute(insertSql, bind)

    bind.IDCURS = await result.outBinds.IDCURS
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
export const turno = async (context) => {
  let query = turnoSql
  let binds = {}

  if (context.IDCURS) {
    binds.idcurs = context.IDCURS
    query += `WHERE tc.idcurs = :idcurs`
  }

  const result = await simpleExecute(query, context)
  return result.rows
}
export const insertTurno = async (bind) => {
  bind.IDTURN = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertTurnoSql, bind)

    bind.IDTURN = await result.outBinds.IDTURN
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

// turnos
export const matricula = async (context) => {
  let query = matriculaSql
  let binds = {}

  if (context.IDCURS) {
    binds.idcurs = context.IDCURS
    query += `WHERE mc.idcurs = :idcurs`
  }

  const result = await simpleExecute(query, context)
  return result.rows
}
export const insertMatricula = async (bind) => {
  bind.IDMATR = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  }

  try {
    const result = await simpleExecute(insertMatriculaSql, bind)

    bind.IDMATR = await result.outBinds.IDMATR
  } catch (error) {
    bind = null
  }

  return bind
}
export const updateMatricula = async (bind) => {
  let result

  try {
    await simpleExecute(updateMatriculaSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}
export const removeMatricula = async (bind) => {
  let result

  try {
    await simpleExecute(removeMatriculaSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// usuarios
export const usuarios = async (context) => {
  let result
  let query = usuariosSql

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

// usuarios turno
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
export const usuariosTurnoPendientes = async (context) => {
  let result
  let query = usuariosTurnoPendientesSql

  try {
    result = await simpleExecute(query, context)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const insertUsuarioTurno = async (bind) => {
  let result

  try {
    await simpleExecute(insertUsuarioTurnoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return bind
}
export const removeUsuarioTurno = async (bind) => {
  let result

  try {
    await simpleExecute(removeUsuarioTurnoSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}

// usuarios matricula
export const usuariosMatricula = async (context) => {
  let result
  let query = usuariosMatriculaSql

  try {
    result = await simpleExecute(query, context)
  } catch (error) {
    result = null
  }

  return result.rows
}
export const insertUsuarioMatricula = async (bind) => {
  let result

  try {
    await simpleExecute(insertUsuarioMatriculaSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return bind
}
export const removeUsuarioMatricula = async (bind) => {
  let result

  try {
    await simpleExecute(removeUsuarioMatriculaSql, bind)

    result = bind
  } catch (error) {
    result = null
  }

  return result
}