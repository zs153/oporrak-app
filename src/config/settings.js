import dotenv from "dotenv";

dotenv.config({ path: __dirname + '/./../../.env' })

export const puerto = process.env.PORT;
export const publicKey = process.env.PUBLIC_KEY
export const serverAPI = process.env.SERVER_API;
export const serverWEB = process.env.SERVER_WEB;
export const serverAUTH = process.env.SERVER_AUTH;