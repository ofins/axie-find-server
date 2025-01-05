import express from 'express';
import { PostRoutesEnum } from 'src/types/routes.enum';
import { AxieMarketController } from '../controllers/axieMarket.controller';

const router = express.Router();
const controller = new AxieMarketController();

router.post(PostRoutesEnum.EXCHANGE_RATES, controller.getExchangeRates);
router.post(PostRoutesEnum.LAND_SALE, controller.getLandSale);
router.post(PostRoutesEnum.LAND_AUCTION, controller.getLandAuction);
router.post(PostRoutesEnum.ERC_1155_TOKEN_SALES, controller.getErc1155TokenSale);

export default router;
