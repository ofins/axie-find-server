import { GraphQLClient, Variables } from 'graphql-request';
import { SM_API_KEY, SM_GATEWAY_GQL } from 'src/config/db';
import {
  erc1155TokenSalesQuery,
  exchangeRatesQuery,
  landSalesQuery,
  landsAuctionQuery,
} from 'src/schemas/queries/axieMarket';
import { MarketplaceResponse } from 'src/types/axieMarketType';
import { RoutesEnum } from 'src/types/routes.enum';

export class AxieMarketService {
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(`${SM_GATEWAY_GQL}/${RoutesEnum.AXIE_MARKETPLACE}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': SM_API_KEY,
      },
    });
  }

  public async fetchExchangeRates(variables: Variables) {
    const response: MarketplaceResponse = await this.client.request(exchangeRatesQuery, variables);
    return response.exchangeRate;
  }

  public async fetchLandSale(variables: Variables) {
    const response: MarketplaceResponse = await this.client.request(landSalesQuery, variables);
    return response.settledAuctions?.lands?.results;
  }
  public async fetchLandAuction(variables: Variables) {
    const response: MarketplaceResponse = await this.client.request(landsAuctionQuery, variables);
    return response.lands?.results;
  }
  public async fetchErc1155TokenSale(variables: Variables) {
    const response: MarketplaceResponse = await this.client.request(
      erc1155TokenSalesQuery,
      variables,
    );
    return response.settledAuctions?.erc1155Tokens?.results;
  }
}
