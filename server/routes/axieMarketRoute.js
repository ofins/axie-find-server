const express = require("express");
const router = express.Router();
const {
  getLandSales,
  getLandAuctions,
  getExchangeRates,
} = require("../controllers/axieMarketController");

router.post("/sales", getLandSales);
router.post("/auctions", getLandAuctions);
router.get("/exchangeRates", getExchangeRates)

module.exports = router;
