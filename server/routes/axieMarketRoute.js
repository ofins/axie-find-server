const express = require("express");
const router = express.Router();
const {
  getLandSales,
  getLandAuctions,
} = require("../controllers/axieMarketController");

router.post("/sales", getLandSales);
router.post("/auctions", getLandAuctions);

module.exports = router;
