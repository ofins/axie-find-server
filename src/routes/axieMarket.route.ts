import express from 'express';
import { AxieMarketController } from '../controllers/axieMarket.controller';

const router = express.Router();
const controller = new AxieMarketController();

router.post('/', controller.getMarketData);

export default router;
