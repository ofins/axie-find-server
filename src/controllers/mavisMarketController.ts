import { GraphQLClient } from "graphql-request";

import {
  genkaiSalesQuery,
  genkaiAuctionsQuery,
  pixelPetsSalesQuery,
  pixelPetsAuctionsQuery,
  cyberKongzVXSalesQuery,
  cyberKongzVXAuctionsQuery,
} from "../schemas/queries/mavisMarket";
import { SM_API_KEY, SM_GATEWAY_GQL } from "../config/db";
import { RoutesEnum } from "../types/routes.enum";

const client = new GraphQLClient(
  `${SM_GATEWAY_GQL}/${RoutesEnum.MAVIS_MARKETPLACE}`,
  {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": SM_API_KEY,
    },
  }
);

function selectMavisMarketQuery(queryType: string) {
  switch (queryType) {
    case "genkaiSalesQuery":
      return genkaiSalesQuery;
    case "genkaiAuctionsQuery":
      return genkaiAuctionsQuery;
    case "pixelPetsSalesQuery":
      return pixelPetsSalesQuery;
    case "pixelPetsAuctionsQuery":
      return pixelPetsAuctionsQuery;
    case "cyberKongzVXSalesQuery":
      return cyberKongzVXSalesQuery;
    case "cyberKongzVXAuctionsQuery":
      return cyberKongzVXAuctionsQuery;
    default:
      return "";
  }
}

function unwrapResData(queryType: string, res) {
  switch (queryType) {
    case "genkaiSalesQuery":
    case "pixelPetsSalesQuery":
    case "cyberKongzVXSalesQuery":
      return res.recentlySolds.results;
    case "genkaiAuctionsQuery":
    case "pixelPetsAuctionsQuery":
    case "cyberKongzVXAuctionsQuery":
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
export const getMavisMarketData = async (req, res) => {
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
