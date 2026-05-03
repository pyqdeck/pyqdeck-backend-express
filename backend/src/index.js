/**
 * PyqDeck - Next-Generation Exam Learning Platform
 *
 * @copyright (c) 2026 PyqDeck. All rights reserved.
 * @license Proprietary
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by the PyqDeck Team <admin@pyqdeck.in>
 */

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

// Database connection and Server Start
const startServer = async () => {
  try {
    await database.connect();
    logger.info('Database connected successfully');

    const PORT = config.port || 3000;
    const server = app.listen(PORT, () => {
      logger.info('🚀 System initialized and connected to Better Stack!');
      logger.info(
        `Server is running on port ${PORT} in ${config.nodeEnv} mode`
      );
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
          process.exit(signal === 'uncaughtException' ? 1 : 0);
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

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', { promise, reason });
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', {
        error: error.message,
        stack: error.stack,
      });
      shutdown('uncaughtException');
    });
  } catch (err) {
    logger.error('Failed to start server', { error: err.message });
    // Give logger time to flush
    setTimeout(() => process.exit(1), 1000);
  }
};

startServer();
