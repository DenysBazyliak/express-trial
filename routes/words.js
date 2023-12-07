const express = require('express')

const router = express.Router()

const {getWord, getWords, patchWord, postWord, putWord,  deleteWord, wordPhotoUpload }= require('../controllers/words')

router.route('/:id/photo').put(wordPhotoUpload)

router
.route('/')
.get(getWords)
.post(postWord)

router
.route('/:id')
.get(getWord)
.put(putWord)
.patch(patchWord)
.delete(deleteWord)


module.exports = router;