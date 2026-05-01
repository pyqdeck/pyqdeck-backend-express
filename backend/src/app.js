import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import swaggerUi from 'swagger-ui-express';
import healthRoutes from './routes/health.js';
import webhookRoutes from './routes/webhook.js';
import { syncUser } from './middlewares/syncUser.middleware.js';
import errorHandler from './middlewares/errorHandler.js';
import { swaggerSpec } from './docs/swagger.js';
import statusMonitor from 'express-status-monitor';

const app = express();

// Real-time Status Monitor (must be before other middlewares)
app.use(
  statusMonitor({
    title: 'PyqDeck API Status',
    path: '/api/v1/status',
    spans: [
      { interval: 1, retention: 60 },
      { interval: 5, retention: 60 },
      { interval: 15, retention: 60 },
    ],
    healthChecks: [
      {
        protocol: 'http',
        host: 'localhost',
        path: '/api/v1/health',
        port: process.env.PORT || 3000,
      },
    ],
  })
);

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

// Routes
app.use('/api/v1', healthRoutes);

// Error handling
app.use(errorHandler);

export default app;
