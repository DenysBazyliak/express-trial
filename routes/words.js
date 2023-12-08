const express = require('express')

const router = express.Router()

const {getWord, getWords, patchWord, postWord, putWord,  deleteWord, wordPhotoUpload }= require('../controllers/words')

const Word = require('../models/Word')  
const advancedResults = require('../middleware/advancedResults')

router
.route('/words/:id/photo')
.put(wordPhotoUpload)

router
.route('/words')
.get(advancedResults(Word), getWords)
.post(postWord)

router
.route('/words/:id')
.get(getWord)
.put(putWord)
.patch(patchWord)
.delete(deleteWord)


module.exports = router;