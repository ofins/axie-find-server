import express from 'express';
import { PostRoutesEnum } from 'src/types/routes.enum';
import { MavisMarketController } from '../controllers/mavisMarketController';

const router = express.Router();
const controller = new MavisMarketController();
/**
 * @swagger
 * tags:
 *   name: Mavis Market
 *   description: API for Mavis Marketplace operations
 */

/**
 * @swagger
 * /v1/services/mavis-marketplace/genkai-sale:
 *   post:
 *     summary: Get Genkai sales
 *     tags: [MavisMarket]
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /v1/services/mavis-marketplace/genkai-auction:
 *   post:
 *     summary: Get Genkai auctions
 *     tags: [MavisMarket]
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /v1/services/mavis-marketplace/pixelpet-sale:
 *   post:
 *     summary: Get Pixel Pets sales
 *     tags: [MavisMarket]
 *     responses:
 *       200:
 *         description: Success
 *//**
 * @swagger
 * /v1/services/mavis-marketplace/pixelpet-auction:
 *   post:
 *     summary: Get Pixel Pets auctions
 *     tags: [MavisMarket]
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /v1/services/mavis-marketplace/cyberkongz-sale:
 *   post:
 *     summary: Get Cyber Kongz sales
 *     tags: [MavisMarket]
 *     responses:
 *       200:
 *         description: Success
 *//**
 * @swagger
 * /v1/services/mavis-marketplace/cyberkongz-auction:
 *   post:
 *     summary: Get Cyber Kongz auctions
 *     tags: [MavisMarket]
 *     responses:
 *       200:
 *         description: Success
 */
router.post(PostRoutesEnum.GENKAI_SALE, controller.getGenkaiSale);
router.post(PostRoutesEnum.GENKAI_AUCTION, controller.getGenkaiAuction);
router.post(PostRoutesEnum.PIXEL_PET_SALE, controller.getPixelPetSale);
router.post(PostRoutesEnum.PIXEL_PET_AUCTION, controller.getPixelPetAuction);
router.post(PostRoutesEnum.CYBER_KONGZ_SALE, controller.getCyberKongzSale);
router.post(PostRoutesEnum.CYBER_KONGZ_AUCTION, controller.getCyberKongzAuction);

export default router;
