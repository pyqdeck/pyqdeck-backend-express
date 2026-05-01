class ConsoleLogger {
  #debugEnabled;

  constructor() {
    this.#debugEnabled =
      process.env.DEBUG === 'true' || process.env.NODE_ENV === 'development';
  }

  info(message, meta = {}) {
    this.#log('INFO', message, meta);
  }

  error(message, meta = {}) {
    this.#log('ERROR', message, meta);
  }

  warn(message, meta = {}) {
    this.#log('WARN', message, meta);
  }

  debug(message, meta = {}) {
    if (this.#debugEnabled) {
      this.#log('DEBUG', message, meta);
    }
  }

  #log(level, message, meta) {
    const timestamp = new Date().toISOString();
    const metaStr =
      Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    console.log(`[${level}] ${timestamp} - ${message}${metaStr}`);
  }
}

class LoggerService {
  #logger;

  constructor() {
    this.#logger = new ConsoleLogger();
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
