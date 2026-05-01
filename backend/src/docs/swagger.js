import swaggerJsdoc from 'swagger-jsdoc';
import config from '../config/index.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Pyqdeck backend service',
    },
    servers: [
      {
        url: `http://localhost:${config.port || 3000}/api/v1`,
        description: 'Development server',
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
        Unauthorized: {
          description: 'Unauthorized access',
        },
        InternalServerError: {
          description: 'Internal server error',
        },
      },
    },
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
