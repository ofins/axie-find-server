const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const colors = require("colors");

const axieRoutes = require("./routes/axieMarketRoute");
const mavisRoutes = require("./routes/mavisMarketRoute");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/axie-marketplace", axieRoutes);
app.use("/mavis-marketplace", mavisRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.yellow.bold);
});
