import swaggerJsdoc from 'swagger-jsdoc';
import config from '../config/index.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PYQDeck API Explorer',
      version: '1.0.0',
      description: `
Welcome to the official **PYQDeck API Documentation**.

This API powers the PYQDeck platform, enabling users to access, bookmark, and study Previous Year Questions (PYQs) efficiently.

### 🔑 Authentication
Most endpoints require a valid Clerk JWT token. Include it in the header:
\`Authorization: Bearer <your_clerk_token>\`

### 📊 Rate Limiting
- **Standard API**: 100 requests per 15 minutes.
- **Webhooks**: 50 requests per 15 minutes.
`,
      contact: {
        name: 'PYQDeck Support',
        url: 'https://pyqdeck.in/support',
        email: 'support@pyqdeck.in',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port || 3000}/api/v1`,
        description: 'Development server',
      },
      {
        url: 'https://api.pyqdeck.in/api/v1',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        BadRequest: {
          description: 'The request was invalid or could not be understood.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        Unauthorized: {
          description:
            'Authentication is required and has failed or has not yet been provided.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        Forbidden: {
          description:
            'The server understood the request but refuses to authorize it.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        NotFound: {
          description: 'The requested resource could not be found.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        TooManyRequests: {
          description:
            'The user has sent too many requests in a given amount of time.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        InternalServerError: {
          description: 'An unexpected error occurred on the server.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Detailed error message here' },
            code: { type: 'integer', example: 400 },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 100 },
            limit: { type: 'integer', example: 10 },
            page: { type: 'integer', example: 1 },
            pages: { type: 'integer', example: 10 },
          },
        },
      },
    },
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
