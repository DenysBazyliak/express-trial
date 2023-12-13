const express = require('express')

const router = express.Router()

const { getWord, getWords, patchWord, postWord, putWord, deleteWord, wordPhotoUpload } = require('../controllers/words')

const Word = require('../models/Word')
const advancedResults = require('../middleware/advancedResults')


const { protect, authorize } = require('../middleware/auth')

router
    .route('/words/:id/photo')
    .put(protect, authorize('publisher', 'admin'), wordPhotoUpload)

router
    .route('/words')
    .get(advancedResults(Word), getWords)
    .post(protect, authorize('publisher', 'admin'), postWord)

router
    .route('/words/:id')
    .get(getWord)
    .put(protect, authorize('publisher', 'admin'), putWord)
    .patch(protect, authorize('publisher', 'admin'), patchWord)
    .delete(protect, authorize('publisher', 'admin'), deleteWord)


module.exports = router;