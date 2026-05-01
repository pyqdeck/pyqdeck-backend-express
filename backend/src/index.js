import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import swaggerUi from 'swagger-ui-express';
import config from './config/index.js';
import database from './config/database.js';
import { loggerService } from './utils/index.js';
import healthRoutes from './routes/health.js';
import webhookRoutes from './routes/webhook.js';
import { syncUser } from './middlewares/syncUser.middleware.js';
import errorHandler from './middlewares/errorHandler.js';
import { swaggerSpec } from './docs/swagger.js';

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

// API Documentation (Swagger)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Clerk Middleware
app.use(clerkMiddleware());
app.use(syncUser);

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
  logger.info(
    `API Documentation available at http://localhost:${PORT}/api-docs`
  );
});
