import {BIND_OUT, NUMBER} from 'oracledb'
import { simpleExecute } from '../services/database.js'

const festivosSql = `SELECT 
  idfest,
  TO_CHAR(fecfes, 'YYYY-MM-DD') "FECFES",
  ofifes
FROM festivos
WHERE fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
`
const festivosOficinaSql = `SELECT 
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') "FECFES"
FROM festivos ff
WHERE (ff.ofifes = :ofifes OR ff.ofifes = 0) AND
  fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
`
const festivosLocalSql = `SELECT 
  ff.idfest,
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') "FECFES",
  ff.ofifes
FROM festivos ff
WHERE ff.ofifes > 0 AND
  ff.fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
`
const festivosOficinaLocalSql = `SELECT 
  ff.idfest,
  TO_CHAR(ff.fecfes, 'YYYY-MM-DD') "FECFES",
  ff.ofifes
FROM festivos ff
WHERE ff.ofifes = :ofifes
AND ff.fecfes BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
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
const updateSql = `BEGIN OPORRAK_PKG.UPDATEFESTIVOS(
  :arrfes,
  :usumov,
  :tipmov,
  :tipmoz
); END;
`

// festivos
export const find = async (context) => {
  // bind
  let query = festivosSql
  const bind = context

  if (context.OFIFES) {
    query += `AND ofifes = :ofifes`
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
  bind.IDFEST = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDFEST = ret.outBinds.IDFEST
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

// oficinas
export const festivosOficina = async (context) => {
  // bind
  const query = festivosOficinaSql
  const bind = context

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const festivosLocal = async (context) => {
  // bind
  let query = festivosLocalSql
  const bind = context

  if (context.OFIFES) {
    query += `AND ff.ofifes = :ofifes`
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}
export const festivosOficinaLocal = async (context) => {
  // bind
  let query = festivosOficinaLocalSql
  const bind = context

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
}