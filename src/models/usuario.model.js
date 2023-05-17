import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
    uu.*,
    oo.desofi
  FROM usuarios uu
  INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
`;
const estadosSql = `WITH datos AS (
  SELECT uu.idusua,
    SUM(CASE WHEN ee.tipest = 2 THEN 1 ELSE 0 END) "VACAS",
    SUM(CASE WHEN ee.tipest = 5 THEN EXTRACT(DAY FROM (hashor-deshor)*24*60) ELSE 0 END) "F",
    SUM(CASE WHEN ee.tipest = 6 THEN EXTRACT(DAY FROM (hashor-deshor)*24*60) ELSE 0 END) "C",
    SUM(CASE WHEN ee.tipest = 8 THEN EXTRACT(DAY FROM (hashor-deshor)*24*60) ELSE 0 END) "H",
    SUM(CASE WHEN ee.tipest = 9 THEN EXTRACT(DAY FROM (hashor-deshor)*24*60) ELSE 0 END) "T"
  FROM usuarios uu
  LEFT JOIN estados ee ON ee.usuest = uu.idusua
  WHERE uu.idusua = :idusua 
  AND ee.fecest BETWEEN TO_DATE(:desde, 'YYYY-MM-DD') AND TO_DATE(:hasta, 'YYYY-MM-DD')
  GROUP BY uu.idusua
)
SELECT uu.idusua,uu.nomusu,uu.userid,uu.ofiusu,uu.telusu,uu.stausu,oo.desofi,
  CASE WHEN dd.vacas IS NULL THEN 0 ELSE dd.vacas END "VACAS",
  CASE WHEN dd.f IS NULL THEN '000:00' ELSE TO_CHAR(TRUNC(dd.f/60), '099') || ':' || TO_CHAR(mod(dd.f, 60), '09') END "FORMA",
  CASE WHEN dd.c IS NULL THEN '000:00' ELSE TO_CHAR(TRUNC(dd.c/60), '099') || ':' || TO_CHAR(mod(dd.c, 60), '09') END "CONCI",
  CASE WHEN dd.h IS NULL THEN '000:00' ELSE TO_CHAR(TRUNC(dd.h/60), '099') || ':' || TO_CHAR(mod(dd.h, 60), '09') END "HORAS",
  CASE WHEN dd.t IS NULL THEN '000:00' ELSE TO_CHAR(TRUNC(dd.t/60), '099') || ':' || TO_CHAR(mod(dd.t, 60), '09') END "TELEF"
FROM usuarios uu
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
LEFT JOIN datos dd ON dd.idusua = uu.idusua
WHERE uu.idusua = :idusua
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTUSUARIO(
  :nomusu,
  :ofiusu,
  :rolusu,
  :userid,
  :emausu,
  :perusu,
  :telusu,
  :stausu,
  :usumov,
  :tipmov,
  :idusua
); END;
`;
const updateSql = `BEGIN OPORRAK_PKG.UPDATEUSUARIO(
    :idusua,
    :nomusu, 
    :ofiusu, 
    :rolusu, 
    :emausu, 
    :perusu, 
    :telusu, 
    :stausu, 
    :usumov, 
    :tipmov
  ); END;
`;
const removeSql = `BEGIN OPORRAK_PKG.DELETEUSUARIO(
  :idusua,
  :usumov,
  :tipmov
); END;
`;
const cambioSql = `BEGIN OPORRAK_PKG.CHANGEPASSWORD(
  :idusua,
  :pwdusu,
  :usumov,
  :tipmov
); END;
`;
const olvidoSql = `BEGIN OPORRAK_PKG.FORGOTPASSWORD(
  :emausu,
  :pwdusu, 
  :tipmov,
  :saltus
); END;
`;
const perfilSql = `BEGIN OPORRAK_PKG.UPDATEPERFILUSUARIO(
  :idusua,
  :nomusu,
  :emausu,
  :telusu, 
  :usumov,
  :tipmov
); END;
`;

export const find = async (context) => {
  // bind
  let query = baseQuery;
  const bind = context

  if (context.IDUSUA) {
    query += `WHERE uu.idusua = :idusua`;
  } else if (context.USERID) {
    query += `WHERE uu.userid = :userid`;
  } else if (context.EMAUSU) {
    query += `WHERE uu.emausu = :emausu`;
  } else if (context.OFIUSU) {
    query += `WHERE uu.ofiusu = :ofiusu`;
  } 

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const findAll = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.oficina) {
    bind.ofiusu = context.oficina
    query = `WITH datos AS (
      SELECT uu.idusua, uu.userid, uu.nomusu, uu.telusu, uu.stausu, oo.desofi FROM usuarios uu
      INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
      WHERE uu.ofiusu = :ofiusu AND
        (uu.nomusu LIKE '%' || :part || '%' OR
        oo.desofi LIKE '%' || :part || '%' OR
        :part IS NULL)
    )
    `
  } else {
    query = `WITH datos AS (
      SELECT uu.idusua, uu.userid, uu.nomusu, uu.telusu, uu.stausu, oo.desofi FROM usuarios uu
      INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
      WHERE 
        uu.nomusu LIKE '%' || :part || '%' OR
        oo.desofi LIKE '%' || :part || '%' OR
        :part IS NULL
    )
    `
  }

  if (context.direction === 'next') {
    bind.nomusu = context.cursor.next === '' ? null : context.cursor.next;
    query += `SELECT * FROM datos
    WHERE nomusu > :nomusu OR :nomusu IS NULL
    ORDER BY nomusu ASC
    FETCH NEXT :limit ROWS ONLY`
  } else {
    bind.nomusu = context.cursor.prev === '' ? null : context.cursor.prev;
    query += `SELECT * FROM datos
    WHERE nomusu < CONVERT(:nomusu, 'US7ASCII') OR :nomusu IS NULL
    ORDER BY nomusu DESC
    FETCH NEXT :limit ROWS ONLY
    `
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: ret.rows.length, data: ret.rows })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const conEstados = async (context) => {
  // bind
  let query = estadosSql
  const bind = context

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
  bind.IDUSUA = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDUSUA = ret.outBinds.IDUSUA
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
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
};
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
};
export const change = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(cambioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const forgot = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(olvidoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
};
export const profile = async (context) => {
  // bind
  const bind = context
  // proc
  const ret = await simpleExecute(perfilSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: 0, data: [] })
  }
}