import { GraphQLClient } from 'graphql-request';
import { SM_API_KEY, SM_GATEWAY_GQL } from 'src/config/db';
import {
  erc1155TokenSalesQuery,
  exchangeRatesQuery,
  landSalesQuery,
  landsAuctionQuery,
} from 'src/schemas/queries/axieMarket';
import { MarketplaceResponse, QueryType } from 'src/types/axieMarketType';
import { RoutesEnum } from 'src/types/routes.enum';

export class AxieMarketService {
  private client: GraphQLClient;
  private queryMap: Map<QueryType, string>;

  constructor() {
    this.client = new GraphQLClient(`${SM_GATEWAY_GQL}/${RoutesEnum.AXIE_MARKETPLACE}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': SM_API_KEY,
      },
    });

    this.queryMap = new Map([
      ['landSalesQuery', landSalesQuery],
      ['landsAuctionQuery', landsAuctionQuery],
      ['exchangeRatesQuery', exchangeRatesQuery],
      ['erc1155TokenSalesQuery', erc1155TokenSalesQuery],
    ]);
  }

  private getQuery(queryType: QueryType): string {
    const query = this.queryMap.get(queryType);
    if (!query) {
      throw new Error(`Invalid query type: ${queryType}`);
    }
    return query;
  }

  private unwrapResponse(queryType: QueryType, response: MarketplaceResponse): any {
    switch (queryType) {
      case 'landSalesQuery':
        return response.settledAuctions?.lands?.results;
      case 'landsAuctionQuery':
        return response.lands?.results;
      case 'exchangeRatesQuery':
        return response.exchangeRate;
      case 'erc1155TokenSalesQuery':
        return response.settledAuctions?.erc1155Tokens?.results;
      default:
        return response;
    }
  }

  public async fetchMarketData(queryType: QueryType, variables: Record<string, any> = {}) {
    const query = this.getQuery(queryType);
    const response: MarketplaceResponse = await this.client.request(query, variables);
    return this.unwrapResponse(queryType, response);
  }
}
