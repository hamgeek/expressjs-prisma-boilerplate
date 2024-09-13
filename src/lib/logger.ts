import path from 'path';
import winston, { createLogger } from 'winston';

const { combine, timestamp, json } = winston.format;

const logger = createLogger({
  level: 'http',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    json(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../log/access.log'),
      level: 'http',
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../log/error.log'),
      level: 'error',
    }),
  ],
});

export { logger };
