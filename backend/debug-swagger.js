import swaggerJsdoc from 'swagger-jsdoc';
const options = {
  definition: { openapi: '3.0.0', info: { title: 'Test', version: '1.0.0' } },
  apis: ['./src/routes/health.js'],
};
console.log(JSON.stringify(swaggerJsdoc(options), null, 2));
