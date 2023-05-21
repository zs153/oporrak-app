import { BIND_OUT, NUMBER } from 'oracledb'
import { simpleExecute } from '../services/database.js'

const cursoSql = "SELECT cc.* FROM cursos cc"
const insertSql = "BEGIN OPORRAK_PKG.INSERTCURSO(:descur,:durcur,:poncur,:notcur,:stacur,:usumov,:tipmov,:idcurs); END;"
const updateSql = "BEGIN OPORRAK_PKG.UPDATECURSO(:idcurs,:descur,:durcur,:poncur,:notcur,:stacur,:usumov,:tipmov); END;"
const removeSql = "BEGIN OPORRAK_PKG.DELETECURSO(:idcurs,:usumov,:tipmov ); END;"
// turnos
const turnoSql = "SELECT tt.idturn,tt.destur,tt.loctur,tt.initur,tt.fintur,TO_CHAR(tt.initur, 'DD/MM/YYYY') STRINI,TO_CHAR(tt.fintur, 'DD/MM/YYYY') STRFIN,LPAD(EXTRACT(HOUR FROM tt.inihor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.inihor), 2, '0') AS INIHOR,LPAD(EXTRACT(HOUR FROM tt.finhor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.finhor), 2, '0') AS FINHOR FROM turnos tt INNER JOIN turnoscurso tc ON tc.idturn = tt.idturn"
const insertTurnoSql = "BEGIN OPORRAK_PKG.INSERTTURNOCURSO(:idcurs,:destur,TO_DATE(:initur,'YYYY-MM-DD'),TO_DATE(:fintur,'YYYY-MM-DD'),:inihor,:finhor,:loctur,:usumov,:tipmov,:idturn); END;"
const updateTurnoSql = "BEGIN OPORRAK_PKG.UPDATETURNOCURSO(:idturn,:destur,TO_DATE(:initur,'YYYY-MM-DD'),TO_DATE(:fintur,'YYYY-MM-DD'),:inihor,:finhor,:loctur,:usumov,:tipmov); END;"
const removeTurnoSql = "BEGIN OPORRAK_PKG.DELETETURNOCURSO(:idcurs,:idturn,:usumov,:tipmov); END;"
// matriculas
const matriculaSql = "SELECT mm.idmatr,mm.desmat,mm.notmat,mm.stamat,TO_CHAR(mm.inimat, 'YYYY-MM-DD') INIMAT,TO_CHAR(mm.finmat, 'YYYY-MM-DD') FINMAT,TO_CHAR(mm.inimat, 'DD/MM/YYYY') STRINI,TO_CHAR(mm.finmat, 'DD/MM/YYYY') STRFIN FROM matriculas mm INNER JOIN matriculascurso mc ON mc.idmatr = mm.idmatr"
const insertMatriculaSql = "BEGIN OPORRAK_PKG.INSERTMATRICULACURSO(:idcurs,:desmat,TO_DATE(:inimat,'YYYY-MM-DD'),TO_DATE(:finmat,'YYYY-MM-DD'),:notmat,:stamat,:usumov,:tipmov,:idmatr); END;"
const updateMatriculaSql = "BEGIN OPORRAK_PKG.UPDATEMATRICULA(:idmatr,:desmat,TO_DATE(:inimat,'YYYY-MM-DD'),TO_DATE(:finmat,'YYYY-MM-DD'),:notmat,:stamat,:usumov,:tipmov); END;"
const removeMatriculaSql = "BEGIN OPORRAK_PKG.DELETEMATRICULACURSO(:idcurs,:idmatr,:usumov,:tipmov); END;"
// usuarios
const insertUsuarioSql = "BEGIN OPORRAK_PKG.INSERTUSUARIOCURSO(:idcurs,:arrusu,:usumov,:tipmov); END;"
const removeUsuarioSql = "BEGIN OPORRAK_PKG.DELETEUSUARIOCURSO(:idcurs,:idusua,:usumov,:tipmov); END;"
// usuarios turno
const insertUsuarioTurnoSql = "BEGIN OPORRAK_PKG.INSERTUSUARIOTURNO(:idturn,:tipest,:arrusu,:usumov,:tipmov); END;"
const removeUsuarioTurnoSql = "BEGIN OPORRAK_PKG.DELETEUSUARIOTURNO(:idturn,:idusua,:usumov,:tipmov); END;"
// usuarios matricula
const insertUsuarioMatriculaSql = "BEGIN OPORRAK_PKG.INSERTUSUARIOMATRICULA(:idmatr,:arrusu,:usumov,:tipmov); END;"
const removeUsuarioMatriculaSql = "BEGIN OPORRAK_PKG.DELETEUSUARIOMATRICULA(:idmatr,:idusua,:usumov,:tipmov); END;"

// cursos
export const find = async (context) => {
  // bind
  const bind = context
  let query = cursoSql

  if (context.IDCURS) {
    query += " WHERE cc.idcurs = :idcurs"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const findAll = async (context) => {
  // bind
  let bind = {
    limit: context.limit,
    part: context.part,
  }
  let query = ''

  if (context.direction === 'next') {
    bind.idcurs = context.cursor.next
    query += "SELECT cc.idcurs,cc.descur,cc.stacur FROM cursos cc WHERE cc.idcurs > :idcurs AND (cc.descur LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY cc.idcurs ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idcurs = context.cursor.prev
    query += "SELECT cc.idcurs,cc.descur,cc.stacur FROM cursos cc WHERE cc.idcurs < :idcurs AND (cc.descur LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY cc.idcurs DESC FETCH NEXT :limit ROWS ONLY"
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
  bind.IDCURS = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDCURS = ret.outBinds.IDCURS
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
    return ({ stat: null, data: [] })
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
    return ({ stat: null, data: [] })
  }
}

// turnos
export const turno = async (context) => {
  // bind
  const bind = context
  let query = turnoSql

  if (context.IDCURS) {
    query += " WHERE tc.idcurs = :idcurs"
  } else if (context.IDTURN) {
    query += " WHERE tc.idturn = :idturn"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const turnos = async (context) => {
  // bind
  let bind = {
    idcurs: context.idcurs,
    limit: context.limit,
    part: context.part,
  }
  let query = ''

  if (context.direction === 'next') {
    bind.idturn = context.cursor.next
    query += "SELECT tt.idturn, tt.destur, tt.loctur, tt.initur, tt.fintur,TO_CHAR(tt.initur, 'DD/MM/YYYY') STRINI,TO_CHAR(tt.fintur, 'DD/MM/YYYY') STRFIN,LPAD(EXTRACT(HOUR FROM tt.inihor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.inihor), 2, '0') AS INIHOR,LPAD(EXTRACT(HOUR FROM tt.finhor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.finhor), 2, '0') AS FINHOR FROM turnos tt INNER JOIN turnoscurso tc ON tc.idturn = tt.idturn WHERE tt.idturn > :idturn AND tc.idcurs = :idcurs AND (tt.destur LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY tt.idturn ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idturn = context.cursor.prev
    query += "SELECT tt.idturn, tt.destur, tt.loctur, tt.initur, tt.fintur,TO_CHAR(tt.initur, 'DD/MM/YYYY') STRINI,TO_CHAR(tt.fintur, 'DD/MM/YYYY') STRFIN,LPAD(EXTRACT(HOUR FROM tt.inihor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.inihor), 2, '0') AS INIHOR,LPAD(EXTRACT(HOUR FROM tt.finhor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.finhor), 2, '0') AS FINHOR FROM turnos tt INNER JOIN turnoscurso tc ON tc.idturn = tt.idturn WHERE tt.idturn < :idturn AND tc.idcurs = :idcurs AND (tt.destur LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY tt.idturn DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insertTurno = async (context) => {
  // bind
  let bind = context
  bind.IDTURN = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertTurnoSql, bind)

  if (ret) {
    bind.IDTURN = ret.outBinds.IDTURN
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}
export const updateTurno = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateTurnoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}
export const removeTurno = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeTurnoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}

// matricula
export const matricula = async (context) => {
  // bind
  let query = matriculaSql
  const bind = context

  if (context.IDCURS) {
    query += " WHERE mc.idcurs = :idcurs"
  } else if (context.IDMATR) {
    query += " WHERE mm.idmatr = :idmatr"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const matriculas = async (context) => {
  // bind
  let bind = {
    idcurs: context.idcurs,
    limit: context.limit,
    part: context.part,
  }
  let query = ''

  if (context.direction === 'next') {
    bind.idmatr = context.cursor.next
    query += "SELECT mm.idmatr,mm.desmat,mm.notmat,mm.stamat,TO_CHAR(mm.inimat, 'YYYY-MM-DD') INIMAT,TO_CHAR(mm.finmat, 'YYYY-MM-DD') FINMAT,TO_CHAR(mm.inimat, 'DD/MM/YYYY') STRINI,TO_CHAR(mm.finmat, 'DD/MM/YYYY') STRFIN FROM matriculas mm INNER JOIN matriculascurso mc ON mc.idmatr = mm.idmatr WHERE mm.idmatr > :idmatr AND mc.idcurs = :idcurs AND (mm.desmat LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY mm.idmatr ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.idmatr = context.cursor.prev
    query += "SELECT mm.idmatr,mm.desmat,mm.notmat,mm.stamat,TO_CHAR(mm.inimat, 'YYYY-MM-DD') INIMAT,TO_CHAR(mm.finmat, 'YYYY-MM-DD') FINMAT,TO_CHAR(mm.inimat, 'DD/MM/YYYY') STRINI,TO_CHAR(mm.finmat, 'DD/MM/YYYY') STRFIN FROM matriculas mm INNER JOIN matriculascurso mc ON mc.idmatr = mm.idmatr WHERE mm.idmatr < :idmatr AND mc.idcurs = :idcurs AND (mm.desmat LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY mm.idmatr DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insertMatricula = async (context) => {
  // bind
  let bind = context
  bind.IDMATR = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertMatriculaSql, bind)

  if (ret) {
    bind.IDMATR = ret.outBinds.IDMATR
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}
export const updateMatricula = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(updateMatriculaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}
export const removeMatricula = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeMatriculaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}

// usuarios curso
export const usuarios = async (context) => {
  // bind
  let query = '';
  let bind = {
    idcurs: context.idcurs,
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query = "SELECT uu.idusua,uu.userid,uu.nomusu,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu INNER JOIN usuarioscurso uc ON uc.idusua= uu.idusua WHERE uu.nomusu > :nomusu  OR :nomusu IS NULL AND uc.idcurs = :idcurs AND (uu.nomusu LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY uu.nomusu ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query = "SELECT uu.idusua,uu.userid,uu.nomusu,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu INNER JOIN usuarioscurso uc ON uc.idusua= uu.idusua WHERE uu.nomusu < :nomusu OR :nomusu IS NULL AND uc.idcurs = :idcurs AND (uu.nomusu LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY uu.nomusu DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const usuariosPendientes = async (context) => {
  // bind
  let query = '';
  let bind = {
    idcurs: context.idcurs,
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query = "WITH datos AS (SELECT uu.idusua,uu.userid,uu.nomusu,oo.idofic,oo.desofi FROM usuariosturno ut INNER JOIN turnoscurso tc ON tc.idturn = ut.idturn AND tc.idcurs = :idcurs INNER JOIN usuarios uu ON uu.idusua = ut.idusua INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu WHERE uu.idusua NOT IN (SELECT uc.idusua FROM usuarioscurso uc WHERE uc.idcurs = :idcurs) AND (nomusu LIKE '%' || :part || '%' OR desofi LIKE '%' || :part || '%' OR :part IS NULL)) SELECT * FROM datos WHERE nomusu > :nomusu OR :nomusu IS NULL ORDER BY nomusu ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query = "WITH datos AS (SELECT uu.idusua,uu.userid,uu.nomusu,oo.idofic,oo.desofi FROM usuariosturno ut INNER JOIN turnoscurso tc ON tc.idturn = ut.idturn AND tc.idcurs = :idcurs INNER JOIN usuarios uu ON uu.idusua = ut.idusua INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu WHERE uu.idusua NOT IN (SELECT uc.idusua FROM usuarioscurso uc WHERE uc.idcurs = :idcurs) AND (nomusu LIKE '%' || :part || '%' OR desofi LIKE '%' || :part || '%' OR :part IS NULL)) SELECT * FROM datos WHERE nomusu < :nomusu OR :nomusu IS NULL ORDER BY nomusu DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insertUsuario = async (context) => {
  // bind
  const bind = context

  // proc
  const ret = await simpleExecute(insertUsuarioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}
export const removeUsuario = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeUsuarioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}

// usuarios turno
export const usuariosTurno = async (context) => {
  // bind
  let query = '';
  let bind = {
    idturn: context.idturn,
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query = "SELECT uu.idusua,uu.userid,uu.nomusu,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu INNER JOIN usuariosturno ut ON ut.idusua= uu.idusua AND ut.idturn = :idturn WHERE uu.nomusu > :nomusu OR :nomusu IS NULL AND (uu.nomusu LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY uu.nomusu ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query = "SELECT uu.idusua,uu.userid,uu.nomusu,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu INNER JOIN usuariosturno ut ON ut.idusua= uu.idusua AND ut.idturn = :idturn WHERE uu.nomusu < :nomusu OR :nomusu IS NULL AND (uu.nomusu LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY uu.nomusu DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const usuariosTurnoPendientes = async (context) => {
  // bind
  let query = '';
  let bind = {
    idcurs: context.idcurs,
    idturn: context.idturn,
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query = "WITH datos AS (SELECT uu.idusua,uu.nomusu,oo.idofic,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu INNER JOIN matriculascurso mc ON mc.idcurs = :idcurs INNER JOIN usuariosmatricula um ON um.idusua = uu.idusua AND um.idmatr = mc.idmatr WHERE uu.idusua NOT IN (SELECT ut.idusua FROM usuariosturno ut WHERE ut.idturn = :idturn) AND (nomusu LIKE '%' || :part || '%' OR desofi LIKE '%' || :part || '%' OR :part IS NULL)) SELECT * FROM datos WHERE nomusu > :nomusu OR :nomusu IS NULL ORDER BY nomusu ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query = "WITH datos AS (SELECT uu.idusua,uu.nomusu,oo.idofic,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu INNER JOIN matriculascurso mc ON mc.idcurs = :idcurs INNER JOIN usuariosmatricula um ON um.idusua = uu.idusua AND um.idmatr = mc.idmatr WHERE uu.idusua NOT IN (SELECT ut.idusua FROM usuariosturno ut WHERE ut.idturn = :idturn) AND (nomusu LIKE '%' || :part || '%' OR desofi LIKE '%' || :part || '%' OR :part IS NULL)) SELECT * FROM datos WHERE nomusu < :nomusu OR :nomusu IS NULL ORDER BY nomusu DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insertUsuarioTurno = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(insertUsuarioTurnoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}
export const removeUsuarioTurno = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(removeUsuarioTurnoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}

// usuarios matricula
export const usuariosMatricula = async (context) => {
  // bind
  let bind = {
    idmatr: context.idmatr,
    limit: context.limit,
    part: context.part,
  }
  let query = ''

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query += "SELECT uu.idusua,uu.userid,uu.nomusu,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu INNER JOIN usuariosmatricula um ON um.idusua= uu.idusua AND um.idmatr = :idmatr WHERE uu.nomusu > :nomusu OR :nomusu IS NULL AND (uu.nomusu LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY uu.nomusu ASC FETCH NEXT :limit ROWS ONLY"
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query += "SELECT uu.idusua,uu.nomusu,uu.userid,oo.desofi FROM usuarios uu INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu INNER JOIN usuariosmatricula um ON um.idusua= uu.idusua AND um.idmatr = :idmatr WHERE uu.nomusu < :nomusu OR :nomusu IS NULL AND (uu.nomusu LIKE '%' || :part || '%' OR oo.desofi LIKE '%' || :part || '%' OR :part IS NULL) ORDER BY uu.nomusu DESC FETCH NEXT :limit ROWS ONLY"
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const insertUsuarioMatricula = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(insertUsuarioMatriculaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}
export const removeUsuarioMatricula = async (context) => {
  // bind
  const bind = context

  // proc
  const ret = await simpleExecute(removeUsuarioMatriculaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: [] })
  }
}