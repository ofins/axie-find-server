const SM_API_KEY = require("../config/db");
const axios = require("axios");
const { gql, GraphQLClient } = require("graphql-request");

const endpoint = "https://api-gateway.skymavis.com/graphql/axie-marketplace"
