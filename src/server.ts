import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import colors from 'colors';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import initSwagger from 'src/swagger';
import { PreRoutesEnum, RoutesEnum } from 'src/types/routes.enum';
import axieRoutes from './routes/axieMarket.route';
import mavisRoutes from './routes/mavisMarketRoute';

export const SM_API_KEY = process.env.SKY_MAVIS_API_KEY;

const app = express();
initSwagger(app);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(`${PreRoutesEnum.V1_SERVICES}${RoutesEnum.AXIE_MARKETPLACE}`, axieRoutes);
app.use('/mavis-marketplace', mavisRoutes);

const PORT = process.env.PORT || 8000;

app.get('/', (_req, res) => {
  res.send('<h1>welcome to axie server</h1>');
});

app.listen(PORT, () => {
  console.log(colors.yellow.bold(`Server is listening on port ${PORT}`));
});
