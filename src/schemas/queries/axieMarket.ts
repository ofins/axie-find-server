import { gql } from 'graphql-request';

const landSalesQuery = gql`
  query getLandsSales($size: Int, $from: Int) {
    settledAuctions {
      lands(from: $from, size: $size) {
        results {
          landType
          col
          row
          tokenId
          owner
          ownerProfile {
            name
          }
          transferHistory(size: 10) {
            results {
              timestamp
              withPrice
              fromProfile {
                name
                addresses {
                  ronin
                }
              }
              txHash
            }
            total
          }
        }
        total
      }
    }
  }
`;

const landsAuctionQuery = gql`
  query GetAuctionsLands($size: Int) {
    lands(auctionType: Sale, sort: PriceAsc, size: $size) {
      results {
        tokenId
        owner
        row
        col
        landType
        order {
          id
          startedAt
          currentPrice
        }
        highestOffer {
          currentPrice
          expiredAt
          addedAt
        }
        transferHistory(size: 3) {
          results {
            withPrice
            timestamp
            toProfile {
              addresses {
                ethereum
                ronin
              }
            }
            fromProfile {
              addresses {
                ethereum
                ronin
              }
            }
          }
        }
        ownerProfile {
          name
          accountId
          activated
        }
      }
      total
    }
  }
`;

const exchangeRatesQuery = gql`
  query ExchangeRate {
    exchangeRate {
      axs {
        usd
      }
      eth {
        usd
      }
      ron {
        usd
      }
      slp {
        usd
      }
      usd {
        usd
      }
      usdc {
        usd
      }
    }
  }
`;

const erc1155TokenSalesQuery = gql`
  query getERC1155TokenSales($size: Int, $tokenType: Erc1155Type!) {
    settledAuctions {
      erc1155Tokens(tokenType: $tokenType, size: $size) {
        results {
          transferHistory {
            results {
              withPrice
              from
              to
              toProfile {
                name
              }
              txHash
              timestamp
              fromProfile {
                name
              }
              settleQuantity
            }
          }
          tokenType
          name
          imageUrl
        }
        total
      }
    }
  }
`;

export { erc1155TokenSalesQuery, exchangeRatesQuery, landSalesQuery, landsAuctionQuery };
