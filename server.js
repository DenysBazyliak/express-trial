const express = require("express");
const dotenv = require("dotenv");
const { log } = require("console");

// Middleware
const logger = require("./middleware/logger");

// Route files
const words = require('./routes/words');

dotenv.config({ path: "./config/config.env" });






const app = express();

// Shows route information
app.use(logger)

// Mount routers
app.use('/app/v1/words/', words)

const PORT = process.env.PORT || 5001;

app.listen(PORT, log(`Server is running in ${process.env.NODE_ENV} mode on port:${PORT}`));
