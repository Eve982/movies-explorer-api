const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies Explorer API',
      description: 'API for Movies Explorer app',
      version: '1.0.0',
      contact: {
        name: 'Olga Bobrova',
      },
      // servers: ['http://localhost:3000'],
    },
  },
  apis: ['../api-docs.yaml'],
};

module.exports.swaggerDocs = swaggerJSDoc(options);
