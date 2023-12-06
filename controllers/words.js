const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')
const Word = require('../models/Word');

// @desc        Get all words
// @route       GET /api/v1/words
// @access      Public
exports.getWords = asyncHandler(async (req, res, next) => {
    let query

    const reqQuery = { ...req.query }

    const removeFields = ['select', 'sort']

    removeFields.forEach(param => delete reqQuery[param])

    queryStr = JSON.stringify(reqQuery)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    query = Word.find(JSON.parse(queryStr))

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    if (req.query.sort) {
        const sortBy = req.query.select.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }

    const words = await query

    res.status(200).json({
        success: true,
        count: words.length,
        data: words,
    });
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
