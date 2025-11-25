import production from './production';
import development from './development';
import test from './test';
import { configDotenv } from 'dotenv';

configDotenv();


export default {
  production,
  development,
  test,
}[process.env.GLOVO_NODE_ENV || 'development'];
