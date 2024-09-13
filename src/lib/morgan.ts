import morgan from 'morgan';

import { logger } from './logger';

const morganLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  },
);

export { morganLogger };
