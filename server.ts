import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import colors from 'colors';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import axieRoutes from './src/routes/axieMarket.route';
import bookRoutes from './src/routes/books';
import mavisRoutes from './src/routes/mavisMarketRoute';

export const SM_API_KEY = process.env.SKY_MAVIS_API_KEY;

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'LogRocket Express API with Swagger',
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
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js', './routes/*.ts'],
};

const app = express();
const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/axie-marketplace', axieRoutes);
app.use('/mavis-marketplace', mavisRoutes);
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 8000;

app.get('/', (_req, res) => {
  res.send('<h1>welcome to axie server</h1>');
});

app.listen(PORT, () => {
  // console.log(`Server is listening on port ${PORT}`, colors.yellow.bold);
  console.log(colors.yellow.bold(`Server is listening on port ${PORT}`));
});
