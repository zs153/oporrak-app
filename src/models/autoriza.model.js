import { simpleExecute, simple } from "../services/database.js";

const baseQuery = `SELECT 
  userid, rolusu, pwdusu FROM activos
WHERE userid = :userid
`
const olvidoSql = `BEGIN RESOURCES_PKG.FORGOTPASSWORD(
  :emausu,
  :pwdusu,
  :saltus
); END;
`

export const find = async (context) => {
  const result = await simpleExecute(baseQuery, context);

  return result.rows;
}
export const forgot = async (context) => {
  let result = null

  try {
    await simpleExecute(olvidoSql, context);

    return result = context;
  } catch (error) {
    throw (error)
  }

  return result
};