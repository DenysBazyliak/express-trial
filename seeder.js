const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: './config/config.env' })

// Load model
const Word = require('./models/Word')

// Connect to db
mongoose.connect(process.env.MONGO_URI);

// Read JSON files 
// If you have files u want ot add preinstalled you may use this whole file 
const words = JSON.parse(fs.readFileSync(`${__dirname}/_data/words.json`, 'utf-8'))

// Import into db
const importData = async ()=>{
    try{
        await Word.create(words)

        console.log('Data imported'.green.inverse)
        process.exit()
    } catch(err){
        console.log(err)
    }
}

// Delete from db   
const deleteData = async ()=>{
    try{
        await Word.deleteMany()

        console.log('Data deleted'.yellow.inverse)
        process.exit()
    } catch(err){
        console.log(err)
    }
}

if(process.argv[2] === '-i'){
    importData()
} else if(process.argv[2] === '-d'){
    deleteData()
}