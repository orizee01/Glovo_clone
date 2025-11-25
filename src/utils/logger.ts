// src/utils/logger.ts
import { createLogger, format, transports, Logger } from 'winston';
import path from 'path';

const { combine, timestamp, printf, errors, colorize, simple, splat } = format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const env = process.env.NODE_ENV || 'development';

let logger: Logger;

if (env === 'production') {
  logger = createLogger({
    level: 'info',
    format: combine(timestamp(), errors({ stack: true }), splat(), logFormat),
    transports: [
      new transports.Console({
        handleExceptions: true,
      }),
      new transports.File({
        filename: path.join('logs', 'error.log'),
        level: 'error',
      }),
      new transports.File({
        filename: path.join('logs', 'combined.log'),
      }),
    ],
    exitOnError: false,
  });
} else if (env === 'test') {
  logger = createLogger({
    level: 'warn', // minimal logging during tests
    format: combine(timestamp(), logFormat),
    transports: [
      new transports.File({
        filename: path.join('logs', 'test.log'),
        level: 'warn',
      }),
    ],
    exitOnError: false,
  });
} else {
  // development
  logger = createLogger({
    level: 'debug',
    format: combine(timestamp(), errors({ stack: true }), splat(), logFormat),
    transports: [
      new transports.Console({
        handleExceptions: true,
        format: combine(colorize(), simple()),
      }),
      new transports.File({
        filename: path.join('logs', 'server.log'),
        level: 'error',
      }),
      new transports.File({
        filename: path.join('logs', 'dev-combined.log'),
      }),
    ],
    exitOnError: false,
  });
}

export default logger;
