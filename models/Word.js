const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: [true, 'Please add a word'],
        unique: true,
        trim:true,
        maxLength: [50,'The word cannot have more than 50 characters']
    },
    // slug: String
    translation: {
        type: String,
        required:   false,
        unique: false,
        trim:true,
        maxLength: [200,'The translation cannot have more than 200 characters']
    },
    definition: {
        type: String,
        required: false,
        unique: false,
        trim:true,
        maxLength: [500,'The definition cannot have more than 500 characters']
    },
    examples: {
        type: String,
        required: false,
        unique: false,
        trim:true,
        maxLength: [500,'The definition cannot have more than 500 characters']
    }
})

module.exports = WordSchema