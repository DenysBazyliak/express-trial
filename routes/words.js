const express = require('express')

const router = express.Router()

const { getWord, getWords, patchWord, postWord, putWord, deleteWord, wordPhotoUpload } = require('../controllers/words')

const Word = require('../models/Word')
const advancedResults = require('../middleware/advancedResults')


const { protect } = require('../middleware/auth')

router
    .route('/words/:id/photo')
    .put(protect, wordPhotoUpload)

router
    .route('/words')
    .get(advancedResults(Word), getWords)
    .post(protect, postWord)

router
    .route('/words/:id')
    .get(getWord)
    .put(protect, putWord)
    .patch(protect, patchWord)
    .delete(protect, deleteWord)


module.exports = router;