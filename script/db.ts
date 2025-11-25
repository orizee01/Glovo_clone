import promise from 'bluebird';
import pgPromise from 'pg-promise';
import monitor from 'pg-monitor';
import dotenv from 'dotenv';

dotenv.config();

const { GLOVO_NODE_ENV, GLOVO_DEV_DATABASE_URL, GLOVO_TEST_DATABASE_URL } = process.env;

// Choose the correct database URL based on the environment
const dbUrl = GLOVO_NODE_ENV === 'test' ? GLOVO_TEST_DATABASE_URL : GLOVO_DEV_DATABASE_URL;

if (!dbUrl) {
  throw new Error('Database URL is not defined in environment variables.');
}

// Function to convert database column names from snake_case to camelCase
const camelizeColumns = (data: any[]) => {
  if (data.length === 0) return;

  const template = data[0];
  Object.keys(template).forEach((prop) => {
    const camel = pgPromise.utils.camelize(prop);
    if (!(camel in template)) {
      data.forEach((el) => {
        el[camel] = el[prop];
        delete el[prop];
      });
    }
  });
};

// Database connection options
const options: pgPromise.IInitOptions<{}> = {
  promiseLib: promise,
  receive: ({ data }) => camelizeColumns(data),
};

// Attach pg-monitor for logging database queries
monitor.setTheme('matrix');
monitor.attach(options);

// Initialize pg-promise with options
const pgp = pgPromise(options);
const db = pgp(dbUrl);

export { db, pgp };
