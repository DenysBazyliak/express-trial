const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')
const Word = require('../models/Word');

const maxSize = process.env.MAX_FILE_UPLOAD
const filePath = process.env.FILE_UPLOAD_PATH

// @desc        Get all words
// @route       GET /api/v1/words
// @access      Public
exports.getWords = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
})

// @desc        Get single word
// @route       GET /api/v1/words/:id
// @access      Public
exports.getWord = asyncHandler(async (req, res, next) => {
    const word = await Word.findById(req.params.id);

    if (!word) {
        return next(new ErrorResponse(`Word not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        data: word,
    });
})

// @desc        Create single word
// @route       POST /api/v1/words
// @access      Public
exports.postWord = asyncHandler(async (req, res, next) => {
    const userId = req.user.id

    // Add user to req.body
    req.body.user = userId

    // Check for published word
    const publishedWord = await Word.findOne({ user: userId })

    const word = await Word.create(req.body);

    res.status(201).json({
        success: true,
        data: word,
    });
})

// @desc        Alter a word
// @route       PUT /api/v1/words/:id
// @access      Public
exports.putWord = asyncHandler(async (req, res, next) => {
    const word = await Word.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!word) {
        return next(new ErrorResponse(`Word not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        data: word,
    });
})

// @desc        Update a word
// @route       PATCH /api/v1/words/:id
// @access      Public
exports.patchWord = asyncHandler(async (req, res, next) => {
    const word = await Word.find(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!word) {
        return res.status(400).json({
            success: false,
        });
    }

    res.status(200).json({
        success: true,
        data: word,
    });
})

// @desc        Delete a word
// @route       DELETE /api/v1/words/:id
// @access      Public
exports.deleteWord = asyncHandler(async (req, res, next) => {
    const word = await Word.deleteOne(req.params.id);

    if (!word.acknowledged) {
        return next(new ErrorResponse(`Word not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
    });
})


// @desc        Upload photo
// @route       PUT /api/v1/words/:id/photo
// @access      Public
exports.wordPhotoUpload = asyncHandler(async (req, res, next) => {
    const word = await Word.findById(req.params.id);

    if (!word) {
        return next(new ErrorResponse(`Word not found with id of ${req.params.id}`, 404))
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400))
    }

    const file = req.files.file

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400))
    }

    // Check file-size
    if (file.size > maxSize) {
        return next(new ErrorResponse(`File should be less than ${maxSize} bites`, 400))
    }

    // Create custom filename 
    file.name = `photo_${word._id}${path.parse(file.name).ext}`

    file.mv(`${filePath}/${file.name}`, async err => {
        if (err) {
            console.log(err)
            return next(new ErrorResponse(`Problem with the file upload`, 500))
        }
        await Word.findByIdAndUpdate(req.params.id, {
            photo: file.name
        })

        res.status(200).json({
            success: true,
            data: file.name
        })
    })

})
