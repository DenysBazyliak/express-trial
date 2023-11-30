const express = require("express");
const dotenv = require("dotenv");
const { log } = require("console");

dotenv.config({ path: "./config/config.env" });

// Route files
const words = require('./routes/words')


const app = express();

// Mount routers
app.use('/app/v1/words/', words)

const PORT = process.env.PORT || 5001;

app.listen(PORT, log(`Server is running in ${process.env.NODE_ENV} mode on port:${PORT}`));
