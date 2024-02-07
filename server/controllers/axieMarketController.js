const express = require("express");
const SM_API_KEY = require("../config/db");
const { GraphQLClient } = require("graphql-request");
const {
  landSalesQuery,
  landsAuctionQuery,
} = require("../schemas/queries/axieMarket");

const endpoint = "https://api-gateway.skymavis.com/graphql/axie-marketplace";

const client = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": SM_API_KEY,
  },
});

const getLandSales = async (req, res) => {
  const { variables } = req.body;
  try {
    const response = await client.request(landSalesQuery, variables);
    res.json(response.settledAuctions.lands.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLandAuctions = async (req, res) => {
  const { variables } = req.body;

  try {
    const response = await client.request(landsAuctionQuery, variables);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getLandSales, getLandAuctions };
