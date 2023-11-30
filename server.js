const express = require("express");
const dotenv = require("dotenv");
const { log } = require("console");

dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5001   ;

app.listen(PORT, log(`Server is running in ${process.env.NODE_ENV} mode on port:${PORT}`));
