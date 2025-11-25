import { configDotenv } from 'dotenv';
configDotenv();

const production = {
  NODE_ENV: process.env.GLOVO_NODE_ENV,
  PORT: process.env.GLOVO_PORT,
  DATABASE_URL: process.env.GLOVO_PROD_DATABASE_URL,
};

export default production;
