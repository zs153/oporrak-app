import oracledb from "oracledb";
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
    :pwdusu,
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
    :userid, 
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
  let query = baseQuery;
  let binds = {};

  if (context.IDUSUA) {
    binds.idusua = context.IDUSUA;
    query += "WHERE uu.idusua = :idusua";
  } else if (context.USERID) {
    binds.userid = context.USERID;
    query += "WHERE uu.userid = :userid";
  } else if (context.EMAUSU) {
    binds.emausu = context.EMAUSU;
    query += "WHERE uu.emausu = :emausu";
  } else if (context.OFIUSU) {
    binds.ofiusu = context.OFIUSU;
    query += "WHERE uu.ofiusu = :ofiusu";
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const insert = async (bind) => {
  bind.idusua = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(insertSql, bind);

    bind.idusua = await result.outBinds.idusua;
  } catch (error) {
    bind = null;
  }

  return bind;
};
export const update = async (bind) => {
  let result;

  try {
    await simpleExecute(updateSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const remove = async (bind) => {
  let result;

  try {
    await simpleExecute(removeSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const change = async (bind) => {
  let result;

  try {
    await simpleExecute(cambioSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const forgot = async (bind) => {
  let result;

  try {
    await simpleExecute(olvidoSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
};
export const profile = async (bind) => {
  let result;

  try {
    await simpleExecute(perfilSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
}