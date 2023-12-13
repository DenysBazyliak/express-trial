const path = require('path')
const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const colors = require('colors')

const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/db')


// Route files
const words = require('./routes/words');
const auth = require('./routes/auth');


// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to the database
connectDB()

const app = express();

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Shows route information
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// File uploading 
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))
// Mount routers
app.use('/app/v1', words)
app.use('/app/v1', auth)

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port:${PORT}`.green.bold));

// Handle unhandled promise rejections 
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error message: ${err.message}`.red.italic)
    // Close server and exit process 
    server.close(() => process.exit(1))
})