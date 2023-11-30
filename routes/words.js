const express = require('express')
const router = express.Router()

const {getWord, getWords, patchWord, postWord, putWord,  deleteWord }= require('../controllers/words')

router
.route('/')
.get(getWord)
.post(postWord)

router
.route('/:id')
.get(getWords)
.put(putWord)
.patch(patchWord)
.delete(deleteWord)

const words = [
    {
        word_id:'seq443',
        word:'node',
        translation:'вузол',
        definition:'A point at which lines or pathways intersect',
        link:'https://translate.google.com'
    },
    {
        word_id:'seq444',
        word:'knot',
        translation:'*',
        definition:'A fastening made by tying a piece of string, rope, or something similar.',
        link:'https://translate.google.com'
    }
]


module.exports = router;