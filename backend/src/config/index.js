import 'dotenv/config';

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/backend',
  clerk: {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    webhookSecret: process.env.CLERK_WEBHOOK_SECRET,
  },
  mail: {
    apiKey: process.env.RESEND_API_KEY || '',
    from: process.env.MAIL_FROM || 'noreply@example.com',
    appName: process.env.APP_NAME || 'Backend API',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  apiUrl:
    process.env.API_URL ||
    `http://localhost:${process.env.PORT || 3000}/api/v1`,
  uploadthingToken: process.env.UPLOADTHING_TOKEN,
};

export default config;
