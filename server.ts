import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import colors from "colors";

import axieRoutes from "./src/routes/axieMarketRoute";
import mavisRoutes from "./src/routes/mavisMarketRoute";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/axie-marketplace", axieRoutes);
app.use("/mavis-marketplace", mavisRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // console.log(`Server is listening on port ${PORT}`, colors.yellow.bold);
  console.log(colors.yellow.bold(`Server is listening on port ${PORT}`));
});
