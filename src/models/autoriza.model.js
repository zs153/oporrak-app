import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT idusua, userid, rolusu, ofiusu, pwdusu FROM usuarios
WHERE userid = :userid
`

export const find = async (context) => {
  let query = baseQuery;

  const result = await simpleExecute(query, context);
  return result.rows;
}
