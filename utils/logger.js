'use strict';

import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

logger.level = 'debug';

if (process.env.NODE_ENV) {
  logger.level = process.env.NODE_ENV;
}

export default logger;
