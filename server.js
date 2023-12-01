const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to the database
connectDB()

// Route files
const words = require('./routes/words');

const app = express();

// Shows route information
// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Mount routers
app.use('/app/v1/words/', words)

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port:${PORT}`));

// Handle unhandled promise rejections 
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error message: ${err.message}`)
    // Close server and exit process 
    server.close(()=> process.exit(1))
})