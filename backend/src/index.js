import app from './app.js';
import config from './config/index.js';
import database from './config/database.js';
import { loggerService } from './utils/index.js';

const logger = loggerService.getLogger();

// Database connection
database.connect().catch((err) => {
  logger.error('Database connection failed', { error: err.message });
  process.exit(1);
});

const PORT = config.port || 3000;
const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${config.nodeEnv} mode`);
  logger.info(
    `API Documentation available at http://localhost:${PORT}/api-docs`
  );
});

// Graceful Shutdown Logic
const shutdown = async (signal) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  // 1. Stop the server from accepting new connections
  server.close(() => {
    logger.info('HTTP server closed.');

    // 2. Close the database connection
    database.disconnect().then(() => {
      logger.info('Database connection closed.');
      process.exit(0);
    });
  });

  // If server.close() takes too long, force exit
  setTimeout(() => {
    logger.error(
      'Could not close connections in time, forcefully shutting down'
    );
    process.exit(1);
  }, 10000); // 10 seconds timeout
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
