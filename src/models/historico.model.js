import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
    idusua,
    nomusu,
    rolusu,
    userid,
    emausu,
    perusu
  FROM historicos
`
const activarSql = `BEGIN OPORRAK_PKG.ACTIVARHISTORICO(
    :idusua,
    :ofiusu,
    :stausu,
    :usumov,
    :tipmov
  ); END;
`

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idusua) {
    binds.idusua = context.idusua;
    query += "WHERE idusua = :idusua";
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
export const activar = async (bind) => {
  let result;

  try {
    await simpleExecute(activarSql, bind);

    result = bind;
  } catch (error) {
    result = null;
  }

  return result;
}