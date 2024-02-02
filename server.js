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
const axie_marketplace_url =
  "https://api-gateway.skymavis.com/graphql/axie-marketplace";
const mavis_marketplace_url =
  "https://api-gateway.skymavis.com/graphql/mavis-marketplace";

app.post("/axie-marketplace", async (req, res) => {
  const query = req.body["query"];

  try {
    const responseData = await handleGraphQLQuery(axie_marketplace_url, query);
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/mavis-marketplace", async (req, res) => {
  const query = req.body["query"];

  try {
    const responseData = await handleGraphQLQuery(mavis_marketplace_url, query);
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function handleGraphQLQuery(baseUrl, query) {
  try {
    const res = await axios.post(
      baseUrl,
      {
        query: query,
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
    return { status: res.status, data };
  } catch (error) {
    throw new Error(`Error in fetchData: ${error.message}`);
  }
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
