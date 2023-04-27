import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
    idusua,
    nomusu,
    userid,
    emausu,
    perusu
  FROM historicos
`
const activarSql = `BEGIN OPORRAK_PKG.ACTIVARHISTORICO(
    :idusua,
    :ofiusu,
    :rolusu,
    :stausu,
    :usumov,
    :tipmov
  ); END;
`

export const find = async (context) => {
  // bind
  let query = baseQuery;
  let bind = context;

  if (context.IDUSUA) {
    query += "WHERE idusua = :idusua";
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
};
export const findAll = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query = `WITH datos AS (
      SELECT idusua, nomusu, userid FROM historicos
      WHERE
        nomusu LIKE '%' || :part || '%' OR
        :part IS NULL
    )
    SELECT * FROM datos
    WHERE nomusu > :nomusu OR :nomusu IS NULL
    ORDER BY nomusu ASC
    FETCH NEXT :limit ROWS ONLY
    `
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query = `WITH datos AS (
      SELECT idusua, nomusu, userid FROM historicos
      WHERE
        nomusu LIKE '%' || :part || '%' OR
        :part IS NULL
    )
    SELECT * FROM datos
    WHERE nomusu < CONVERT(:nomusu, 'US7ASCII') OR :nomusu IS NULL
    ORDER BY nomusu DESC
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
export const activar = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(activarSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}