const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const axios = require("axios");
const apiKey = process.env.SKY_MAVIS_API_KEY;

const app = express();
app.use(morgan("dev")); // Log HTTP requests to the console

const axie_marketplace_url =
  "https://api-gateway.skymavis.com/graphql/axie-marketplace";

router.post("/", async (req, res) => {
  //logic
  //   console.log(req, res);
  const { query, variables } = req.body;

  try {
    const responseData = await handleGraphQLQuery(
      axie_marketplace_url,
      query,
      variables
    );
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

async function handleGraphQLQuery(baseUrl, query, variables) {
  try {
    const res = await axios.post(
      baseUrl,
      {
        query: query,
        variables: variables,
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

module.exports = router;
