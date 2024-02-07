const SM_API_KEY = require("../config/db");
const { GraphQLClient } = require("graphql-request");

const endpoint = "https://api-gateway.skymavis.com/graphql/mavis-marketplace";

const client = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": SM_API_KEY,
  },
});