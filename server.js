const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')

const { log } = require("console");

// Route files
const words = require('./routes/words');

dotenv.config({ path: "./config/config.env" });


const app = express();

// Shows route information
// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Mount routers
app.use('/app/v1/words/', words)

const PORT = process.env.PORT || 5001;

app.listen(PORT, log(`Server is running in ${process.env.NODE_ENV} mode on port:${PORT}`));
