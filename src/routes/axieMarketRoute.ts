import express from 'express';
import { getAxieMarketData } from '../controllers/axieMarketController';

const router = express.Router();
router.post('/', getAxieMarketData);

export default router;
