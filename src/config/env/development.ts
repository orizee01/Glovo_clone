import { configDotenv } from 'dotenv';
configDotenv();

const development = {
  NODE_ENV: process.env.GLOVO_NODE_ENV,
  PORT: process.env.GLOVO_PORT,
  DATABASE_URL: process.env.GLOVO_DEV_DATABASE_URL,
};

export default development;
