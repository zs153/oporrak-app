import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
  idtipo,
  destip,
  anuhit
FROM tiposhito
`;
const insertSql = `BEGIN FRAUDE_PKG.INSERTTIPOHITO(
  :destip,
  :anuhit,
  :usumov,
  :tipmov,
  :idtipo
); END;
`;
const updateSql = `BEGIN FRAUDE_PKG.UPDATETIPOHITO(
  :idtipo,
  :destip,
  :anuhit,
  :usumov,
  :tipmov
); END;
`;
const removeSql = `BEGIN FRAUDE_PKG.DELETETIPOHITO(
  :idtipo,
  :usumov,
  :tipmov 
); END;
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idtipo) {
    binds.idtipo = context.idtipo;
    query += `WHERE idtipo = :idtipo`;
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const findAll = async (context) => {
  let query = baseQuery;
  let binds = {};

  const result = await simpleExecute(query, binds);
  return result.rows;
};

export const insert = async (bind) => {
  bind.idtipo = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  try {
    const result = await simpleExecute(insertSql, bind);

    bind.idtipo = await result.outBinds.idtipo;
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