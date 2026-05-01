import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import app from './app.js';
import config from './config/index.js';
import database from './config/database.js';
import { loggerService } from './utils/index.js';

const logger = loggerService.getLogger();

// Initialize Sentry
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [nodeProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
    environment: config.nodeEnv,
  });
  logger.info('Sentry initialized successfully');
}

// Database connection
database.connect().catch((err) => {
  logger.error('Database connection failed', { error: err.message });
  process.exit(1);
});

const PORT = config.port || 3000;
const server = app.listen(PORT, () => {
  logger.info('🚀 System initialized and connected to Better Stack!');
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
