import { GraphQLClient } from 'graphql-request';
import {
  erc1155TokenSalesQuery,
  exchangeRatesQuery,
  landSalesQuery,
  landsAuctionQuery,
} from '../schemas/queries/axieMarket';

import { Request, Response } from 'express';
import { SM_API_KEY, SM_GATEWAY_GQL } from '../config/db';
import { RoutesEnum } from '../types/routes.enum';

const client = new GraphQLClient(`${SM_GATEWAY_GQL}/${RoutesEnum.AXIE_MARKETPLACE}`, {
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': SM_API_KEY,
  },
});

function selectAxieMarketQuery(queryType: string) {
  switch (queryType) {
    case 'landSalesQuery':
      return landSalesQuery;
    case 'landsAuctionQuery':
      return landsAuctionQuery;
    case 'exchangeRatesQuery':
      return exchangeRatesQuery;
    case 'erc1155TokenSalesQuery':
      return erc1155TokenSalesQuery;
    default:
      return '';
  }
}

function unwrapResData(queryType: string, res: any) {
  switch (queryType) {
    case 'landSalesQuery':
      return res.settledAuctions.lands.results;
    case 'landsAuctionQuery':
      return res.lands.results;
    case 'exchangeRatesQuery':
      return res.exchangeRate;
    case 'erc1155TokenSalesQuery':
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
export const getAxieMarketData = async (req: Request, res: Response) => {
  const { queryType, variables = {} } = req.body;
  // console.log(queryType, variables);

  try {
    if (!queryType) {
      throw new Error('queryType is required!');
    }

    const response = await client.request(selectAxieMarketQuery(queryType), variables);
    const data = await unwrapResData(queryType, response);
    res.status(200).json({ status: 200, data: data });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
