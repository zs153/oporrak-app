import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  oo.*
FROM oficinas oo
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTOFICINA(
  :desofi, 
  :codofi,
  :usumov,
  :tipmov,
  :idofic
); END;
`
const updateSql = `BEGIN OPORRAK_PKG.UPDATEOFICINA(
  :idofic,
  :desofi, 
  :codofi,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETEOFICINA(
  :idofic,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  // bind
  let query = baseQuery
  const bind = context

  if (context.IDOFIC) {
    query += `WHERE oo.idofic = :idofic`
  }
  if (context.CODOFI) {
    query += `WHERE oo.codofi = :codofi`
  }
  
  // proc
  const ret = await simpleExecute(query, bind)
  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
}
export const findAll = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.IDOFIC = context.cursor.next;
    query = `WITH datos AS (
      SELECT * FROM oficinas
      WHERE
        desofi LIKE '%' || :part || '%' OR
        :part IS NULL
    )
    SELECT * FROM datos
    WHERE idofic > :idofic
    ORDER BY idofic ASC
    FETCH NEXT :limit ROWS ONLY
    `
  } else {
    bind.IDOFIC = context.cursor.prev;
    query = `WITH datos AS (
      SELECT * FROM oficinas
      WHERE
        desofi LIKE '%' || :part || '%' OR
        :part IS NULL
    )
    SELECT * FROM datos
    WHERE idofic < :idofic
    ORDER BY idofic DESC
    FETCH NEXT :limit ROWS ONLY
    `
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
};
export const insert = async (context) => {
  // bind
  let bind = context
  bind.IDOFIC = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDOFIC = ret.outBinds.IDOFIC
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
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
    return ({ stat: null, data: err })
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
    return ({ stat: null, data: err })
  }
}
