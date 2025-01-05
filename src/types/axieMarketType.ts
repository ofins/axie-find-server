/* eslint-disable @typescript-eslint/no-explicit-any */
export type QueryType =
  | 'landSalesQuery'
  | 'landsAuctionQuery'
  | 'exchangeRatesQuery'
  | 'erc1155TokenSalesQuery';

export interface MarketplaceResponse {
  settledAuctions?: {
    lands?: {
      results: any[];
    };
    erc1155Tokens?: {
      results: any[];
    };
  };
  lands?: {
    results: any[];
  };
  exchangeRate?: any;
}
