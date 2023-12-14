const mongoose = require('mongoose');
const slugify = require('slugify')

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, 'Please add a word'],
    unique: true,
    trim: true,
    maxLength: [50, 'The word cannot have more than 50 characters']
  },
  slug: String,
  translation: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    maxLength: [80, 'The translation cannot have more than 80 characters']

  },
  definition: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    maxLength: [400, 'The definition cannot have more than 400 characters']
  },
  examples: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    maxLength: [500, 'The definition cannot have more than 500 characters']
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  user:{
    type: mongoose.Schema.ObjectId,
    ref:'User',
    required: true
  }
});

WordSchema.pre('save', function (next) {
  this.slug = slugify(this.word, { lower: true })
  next()
})

module.exports = mongoose.model('WordSchema', WordSchema);