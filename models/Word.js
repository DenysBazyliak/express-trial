const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: [true, 'Please add a word'],
        unique: true,
        trim: true,
        maxLength: [50, 'The word cannot have more than 50 characters']
    },
    translation: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        maxLength:[80, 'The translation cannot have more than 80 characters']

    },
    definition: {
        type: String,
        required: false,
        unique: false,
        trim:true,
        maxLength: [400, 'The definition cannot have more than 400 characters']
    },
    examples: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        maxLength: [500, 'The definition cannot have more than 500 characters']
    }


})

module.exports = mongoose.model('WordSchema', WordSchema)