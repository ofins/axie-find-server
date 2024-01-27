import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const apiKey = process.env.SKY_MAVIS_API_KEY;
const baseUrl = "https://api-gateway.skymavis.com/graphql/axie-marketplace"

const mock_query = `
query LandListed {
    lands(
      size: 24
      criteria: {landType: Savannah}
      auctionType: Sale
      sort: PriceAsc
    ) {
      results {
        tokenId
        owner
        row
        col
        order {
          currentPriceUsd
          id
          startedAt
        }
      }
    }
  }
`

app.post("/GetListedLands", async (req, res) => {
  const query = req.body["query"];
//   const query = mock_query;

  try {
      const responseData = await handleGraphQLQuery(query);
      res.json(responseData);
  } catch (error) {
    res.status(500).json({error:error.message})
  }

});

async function handleGraphQLQuery(query) {

  try {
    const res = await axios.post(
      baseUrl,
      {
        query: query, // Include the GraphQL query in the request body
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      }
    );

    const contentType = res.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not in JSON format");
    }
    const data = res.data;
    return {status: res.status, data}
  } catch (error) {
    throw new Error(`Error in fetchData: ${error.message}`);
  }
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
