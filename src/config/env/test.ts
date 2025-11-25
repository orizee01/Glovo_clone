import { configDotenv } from 'dotenv';
configDotenv();

const test = {
  NODE_ENV: process.env.GLOVO_NODE_ENV,
  PORT: process.env.GLOVO_PORT,
  DATABASE_URL: process.env.GLOVO_TEST_DATABASE_URL,
};

export default test;
