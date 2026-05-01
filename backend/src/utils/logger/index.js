import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const { combine, timestamp, json, colorize, printf, errors } = winston.format;

// Custom format for local console (Human-readable)
const consoleFormat = printf(
  ({ level, message, timestamp, stack, ...meta }) => {
    const metaStr =
      Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level}]: ${stack || message}${metaStr}`;
  }
);

class LoggerService {
  #logger;

  constructor() {
    const transports = [
      // 1. Console Transport (Always enabled)
      new winston.transports.Console({
        level: process.env.LOG_LEVEL || 'info',
        format: combine(
          colorize(),
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          errors({ stack: true }),
          consoleFormat
        ),
      }),
    ];

    // 2. File Transport (Production/Staging/Development only)
    if (process.env.NODE_ENV !== 'test') {
      transports.push(
        new DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'info',
          format: combine(timestamp(), errors({ stack: true }), json()),
        })
      );
    }

    // 3. Better Stack (Logtail) Transport (Always enabled if token provided)
    if (process.env.LOGTAIL_SOURCE_TOKEN) {
      const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);
      transports.push(new LogtailTransport(logtail));
    }

    this.#logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      transports,
    });
  }

  getLogger() {
    return this.#logger;
  }

  setLogger(logger) {
    this.#logger = logger;
  }
}

export const loggerService = new LoggerService();
export default loggerService;
