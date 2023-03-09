import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
    uu.*,
    oo.desofi
  FROM usuarios uu
  INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
`;
const insertSql = `BEGIN OPORRAK_PKG.INSERTUSUARIO(
    :nomusu,
    :ofiusu,
    :rolusu,
    :userid,
    :emausu,
    :perusu,
    :telusu,
    :stausu,
    :pwdusu,
    :seed,
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
  let bind = {};

  if (context.IDUSUA) {
    bind.IDUSUA = context.IDUSUA;
    query += `WHERE uu.idusua = :idusua`;
  } else if (context.USERID) {
    bind.USERID = context.USERID;
    query += `WHERE uu.userid = :userid`;
  } else if (context.EMAUSU) {
    bind.EMAUSU = context.EMAUSU;
    query += `WHERE uu.emausu = :emausu`;
  } else if (context.OFIUSU) {
    bind.OFIUSU = context.OFIUSU;
    query += `WHERE uu.ofiusu = :ofiusu`;
  } 

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({stat: 1, data: ret.rows})
  } else {
    return ({stat: null, data: null})
  }
};
export const findAll = async (context) => {
  // bind
  let query = '';
  let bind = {
    LIMIT: context.LIMIT
  };

  if (context.DIRECTION) {
    bind.IDUSUA = context.CURSOR.NEXT;
    query = `SELECT * FROM usuarios
      WHERE idusua > :idusua
      ORDER BY idusua ASC
      FETCH NEXT :limit ROWS ONLY
    `;
  } else {
    bind.IDUSUA = context.CURSOR.PREV;
    query = `WITH datos AS (
      SELECT * FROM usuarios
      WHERE idusua < :idusua
      ORDER BY idusua DESC
      FETCH NEXT :limit ROWS ONLY
    )
    SELECT * FROM datos ORDER BY idusua ASC
    `;
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
};
export const insert = async (bind) => {
  // bind
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
    return ({ stat: null, data: err })
  }
};
export const update = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(updateSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
};
export const remove = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(removeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
};
export const change = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(cambioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
};
export const forgot = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(olvidoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
};
export const profile = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(perfilSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}