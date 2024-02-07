const express = require("express");
const router = express.Router();
const { getAxieMarketData } = require("../controllers/axieMarketController");

router.post("/", getAxieMarketData);

module.exports = router;
