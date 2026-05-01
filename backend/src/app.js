import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import swaggerUi from 'swagger-ui-express';
import healthRoutes from './routes/health.js';
import webhookRoutes from './routes/webhook.js';
import universityRoutes from './routes/universities.js';
import subjectRoutes from './routes/subjects.js';
import paperRoutes from './routes/papers.js';
import { syncUser } from './middlewares/syncUser.middleware.js';
import errorHandler from './middlewares/errorHandler.js';
import * as Sentry from '@sentry/node';
import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter } from './utils/uploadthing.js';
import { swaggerSpec } from './docs/swagger.js';

const app = express();

// Sentry error handler (Must be after app is initialized)
if (process.env.SENTRY_DSN) {
  Sentry.setupExpressErrorHandler(app);
}

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
app.use('/api/v1/universities', universityRoutes);
app.use('/api/v1/subjects', subjectRoutes);
app.use('/api/v1/papers', paperRoutes);
app.use(
  '/api/v1/uploadthing',
  createRouteHandler({
    router: uploadRouter,
  })
);

// Error handling
app.use(errorHandler);

export default app;
