const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: './config/config.env' })

// Load model
const Word = require('./models/Word')
const User = require('./models/User')

// Connect to db
mongoose.connect(process.env.MONGO_URI);

// Read JSON files 
// If you have files you want to add preinstalled you may use this whole file 
const words = JSON.parse(fs.readFileSync(`${__dirname}/_data/words.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))

// Import into db
const importData = async () => {
    try {
        console.log('Data deleted'.yellow.inverse)
        await Word.create(words)
        await User.create(users)
        console.log('Data imported'.green.inverse)
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

// Delete from db   
const deleteData = async () => {
    try {
        await Word.deleteMany()
        await User.deleteMany()

        console.log('Data deleted'.yellow.inverse)
        process.exit()
    } catch (err) {
        console.log(err)
    }
}