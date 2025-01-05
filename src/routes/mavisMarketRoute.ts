import express from "express";
import { getMavisMarketData } from "../controllers/mavisMarketController";
const router = express.Router();

router.post("/", getMavisMarketData);

export default router;
