import express from 'express';
import { PostRoutesEnum } from 'src/types/routes.enum';
import { AxieMarketController } from '../controllers/axieMarket.controller';

const router = express.Router();
const controller = new AxieMarketController();
/**
 * @swagger
 * tags:
 *   name: AxieMarket
 *   description: API for Axie Marketplace operations
 */

/**
 * @swagger
 * /v1/services/axie-marketplace/exchange:
 *   post:
 *     summary: Get exchange rates
 *     tags: [AxieMarket]
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /v1/services/axie-marketplace/land-sale:
 *   post:
 *     summary: Get land sales
 *     tags: [AxieMarket]
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /v1/services/axie-marketplace/land-auction:
 *   post:
 *     summary: Get land sales
 *     tags: [AxieMarket]
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /v1/services/axie-marketplace/erc1155-sale:
 *   post:
 *     summary: Get land sales
 *     tags: [AxieMarket]
 *     responses:
 *       200:
 *         description: Success
 */

router.post(PostRoutesEnum.EXCHANGE_RATES, controller.getExchangeRates);
router.post(PostRoutesEnum.LAND_SALE, controller.getLandSale);
router.post(PostRoutesEnum.LAND_AUCTION, controller.getLandAuction);
router.post(PostRoutesEnum.ERC_1155_TOKEN_SALES, controller.getErc1155TokenSale);

export default router;
