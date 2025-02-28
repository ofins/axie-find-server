/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient, Variables } from 'graphql-request';
import { SM_API_KEY, SM_GATEWAY_GQL } from 'src/config/db';
import {
  cyberKongzVXAuctionsQuery,
  cyberKongzVXSalesQuery,
  genkaiAuctionsQuery,
  genkaiSalesQuery,
  pixelPetsAuctionsQuery,
  pixelPetsSalesQuery,
} from 'src/schemas/queries/mavisMarket';
import { RoutesEnum } from 'src/types/routes.enum';

interface MavisMarketResponse {
  recentlySolds: {
    results: any[];
  };
  erc721Tokens: {
    results: any[];
  };
}

export class MavisMarketService {
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(`${SM_GATEWAY_GQL}/${RoutesEnum.MAVIS_MARKETPLACE}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': SM_API_KEY,
      },
    });
  }

  public async fetchGenkaiSale(variables: Variables) {
    const response: MavisMarketResponse = await this.client.request(genkaiSalesQuery, variables);
    return response.recentlySolds.results;
  }

  public async fetchGenkaiAuction(variables: Variables) {
    const response: MavisMarketResponse = await this.client.request(genkaiAuctionsQuery, variables);
    return response.erc721Tokens.results;
  }
  public async fetchPixelPetSale(variables: Variables) {
    const response: MavisMarketResponse = await this.client.request(pixelPetsSalesQuery, variables);
    return response.recentlySolds.results;
  }

  public async fetchPixelPetAuction(variables: Variables) {
    const response: MavisMarketResponse = await this.client.request(
      pixelPetsAuctionsQuery,
      variables,
    );
    return response.erc721Tokens.results;
  }
  public async fetchCyberKongzSale(variables: Variables) {
    const response: MavisMarketResponse = await this.client.request(
      cyberKongzVXSalesQuery,
      variables,
    );
    return response.recentlySolds.results;
  }

  public async fetchCyberKongzAuction(variables: Variables) {
    const response: MavisMarketResponse = await this.client.request(
      cyberKongzVXAuctionsQuery,
      variables,
    );
    return response.erc721Tokens.results;
  }
}
