import { SM_API_KEY } from "../config/db";
import { GraphQLClient } from "graphql-request";
import {
  landSalesQuery,
  landsAuctionQuery,
  exchangeRatesQuery,
  erc1155TokenSalesQuery,
} from "../schemas/queries/axieMarket";

const endpoint = "https://api-gateway.skymavis.com/graphql/axie-marketplace";

const client = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": SM_API_KEY,
  },
});

function selectAxieMarketQuery(queryType: string) {
  switch (queryType) {
    case "landSalesQuery":
      return landSalesQuery;
    case "landsAuctionQuery":
      return landsAuctionQuery;
    case "exchangeRatesQuery":
      return exchangeRatesQuery;
    case "erc1155TokenSalesQuery":
      return erc1155TokenSalesQuery;
    default:
      return "";
  }
}

function unwrapResData(queryType: string, res) {
  switch (queryType) {
    case "landSalesQuery":
      return res.settledAuctions.lands.results;
    case "landsAuctionQuery":
      return res.lands.results;
    case "exchangeRatesQuery":
      return res.exchangeRate;
    case "erc1155TokenSalesQuery":
      return res.settledAuctions.erc1155Tokens.results;
    default:
      return res;
  }
}

/**
 *
 * @desc Fetch Axie Marketplace Data
 * @route POST /axie-marketplace
 * @db graphQL
 * @param {
 *  queryType:{
 *  landSalesQuery,
 *  landsAuctionQuery,
 *  exchangeRatesQuery,
 *  erc1155TokenSalesQuery
 * },
 *  variables
 * }
 */
export const getAxieMarketData = async (req, res) => {
  const { queryType, variables = {} } = req.body;

  try {
    if (!queryType) {
      throw new Error("queryType is required!");
    }

    const response = await client.request(
      selectAxieMarketQuery(queryType),
      variables
    );
    const data = await unwrapResData(queryType, response);
    res.status(200).json({ status: 200, data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
