import dotenv from "dotenv";

dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;

export const secret = process.env.ACCESS_TOKEN_SECRET;
export const maxRows = 50000;
export const batchSize = 1000;
