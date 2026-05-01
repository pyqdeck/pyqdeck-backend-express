import errorFormatter from '../utils/formatters/errorFormatter.js';
import { loggerService } from '../utils/index.js';

const logger = loggerService.getLogger();

function errorHandler(err, req, res, next) {
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const statusCode = err.statusCode || 500;
  const formattedError = errorFormatter.formatError(err, statusCode);

  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    delete formattedError.stack;
  }

  res.status(statusCode).json(formattedError);
}

export default errorHandler;
