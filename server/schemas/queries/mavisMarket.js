const { gql } = require("graphql-request");

/**
 * @description Cyberkongz Genkai
 */
const genkaiSalesQuery = gql`
  query getGenkaiSales {
    recentlySolds(
      from: 0
      size: 40
      tokenAddress: "0x1f7c16fce4fc894143afb5545bf04f676bf7dcf3"
    ) {
      results {
        realPrice
        timestamp
        paymentToken
        txHash
        assets {
          address
          erc
          id
          orderId
          quantity
        }
        matcher
        orderId
        orderKind
        maker
      }
    }
  }
`;

const genkaiAuctionsQuery = gql`
  query MyQuery {
    erc721Tokens(
      from: 0
      size: 50
      tokenAddress: "0x1f7c16fce4fc894143afb5545bf04f676bf7dcf3"
      auctionType: Sale
      sort: PriceAsc
    ) {
      results {
        name
        transferHistory(size: 3) {
          results {
            withPrice
            timestamp
            to
          }
          total
        }
        image
        owner
        order {
          startedAt
          currentPrice
          assets {
            address
            id
          }
        }
        offers {
          currentPrice
        }
      }
    }
  }
`;

/**
 * @description Pixel Pets
 */
const pixelPetsSalesQuery = gql`
  query getGenkaiSales {
    recentlySolds(
      from: 0
      size: 40
      tokenAddress: "0xb806028b6ebc35926442770a8a8a7aeab6e2ce5c"
    ) {
      results {
        realPrice
        timestamp
        paymentToken
        txHash
        assets {
          address
          erc
          id
          orderId
          quantity
        }
        matcher
        orderId
        orderKind
        maker
      }
    }
  }
`;

const pixelPetsAuctionsQuery = gql`
  query MyQuery {
    erc721Tokens(
      from: 0
      size: 50
      tokenAddress: "0xb806028b6ebc35926442770a8a8a7aeab6e2ce5c"
      auctionType: Sale
      sort: PriceAsc
    ) {
      results {
        name
        transferHistory(size: 3) {
          results {
            withPrice
            timestamp
            to
          }
          total
        }
        image
        owner
        order {
          startedAt
          currentPrice
          assets {
            address
            id
          }
        }
        offers {
          currentPrice
        }
      }
    }
  }
`;

module.exports = {
  genkaiSalesQuery,
  genkaiAuctionsQuery,
  pixelPetsSalesQuery,
  pixelPetsAuctionsQuery,
};
