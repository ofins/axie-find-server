const express = require("express");
const router = express.Router();
const { getMavisMarketData } = require("../controllers/mavisMarketController");

router.post("/", getMavisMarketData);

module.exports = router;
