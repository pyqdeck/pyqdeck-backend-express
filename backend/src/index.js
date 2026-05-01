import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import config from './config/index.js';
import database from './config/database.js';
import { loggerService } from './utils/index.js';
import healthRoutes from './routes/health.js';
import webhookRoutes from './routes/webhook.js';
import errorHandler from './middlewares/errorHandler.js';

const logger = loggerService.getLogger();
const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());

// Logging
app.use(morgan('dev'));

// Webhook routes (must be before express.json() — svix needs the raw body)
app.use('/api/v1/webhooks', webhookRoutes);

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk Middleware
app.use(clerkMiddleware());

// Database connection
database.connect().catch((err) => {
  logger.error('Database connection failed', { error: err.message });
  process.exit(1);
});

// Routes
app.use('/api/v1', healthRoutes);

// Error handling
app.use(errorHandler);

const PORT = config.port || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${config.nodeEnv} mode`);
});
