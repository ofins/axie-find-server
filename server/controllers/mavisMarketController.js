const SM_API_KEY = require("../config/db");
const { GraphQLClient } = require("graphql-request");
const {
  genkaiSalesQuery,
  genkaiAuctionsQuery,
} = require("../schemas/queries/mavisMarket");

const endpoint = "https://api-gateway.skymavis.com/graphql/mavis-marketplace";

const client = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": SM_API_KEY,
  },
});

function selectMavisMarketQuery(queryType) {
  switch (queryType) {
    case "genkaiSalesQuery":
      return genkaiSalesQuery;
    case "genkaiAuctionsQuery":
      return genkaiAuctionsQuery;
    default:
      return "";
  }
}

function unwrapResData(queryType, res) {
  switch (queryType) {
    case "genkaiSalesQuery":
      return res.recentlySolds.results;
    case "genkaiAuctionsQuery":
      return res.erc721Tokens.results;
    default:
      return res;
  }
}

/**
 *
 * @desc Fetch Mavis Marketplace Data
 * @route POST /mavis-marketplace
 * @db graphQL
 * @param {
 *  queryType:{
 *  genkaiSalesQuery,
 *  genkaiAuctionsQuery
 * },
 *  variables
 * }
 */
const getMavisMarketData = async (req, res) => {
  const { queryType, variables = {} } = req.body;

  try {
    if (!queryType) {
      throw new Error("queryType is required!");
    }

    const response = await client.request(
      selectMavisMarketQuery(queryType),
      variables
    );
    const data = await unwrapResData(queryType, response);
    res.status(200).json({ status: 200, data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMavisMarketData };
