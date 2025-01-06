import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const initSwagger = (app: Application) => {
  const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Axie Finder API with Swagger',
        version: '0.1.0',
        description:
          'This is a simple CRUD API application made with Express and documented with Swagger',
        license: {
          name: 'MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'LogRocket',
          url: 'https://logrocket.com',
          email: 'info@email.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:8000',
        },
      ],
    },
    apis: ['./src/routes/**/*.js', './src/routes/**/*.ts'],
  };

  const specs = swaggerJsdoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default initSwagger;
