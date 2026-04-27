import dotenv from "dotenv";

const envName = process.env.ENV_NAME || "local";

dotenv.config({
  path: `configs/.env.${envName}`,
  quiet: true,
});

export const env = {
  BASE_URL: String(process.env.BASE_URL),
  USERNAME: String(process.env.USERNAME),
  PASSWORD: String(process.env.PASSWORD),
  SLOWMO: Number(process.env.SLOWMO),
};

async function globalSetup() {}

export default globalSetup;
