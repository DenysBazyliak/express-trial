const words = require('../_data/words')



// @desc        Get all words
// @route       GET /api/v1/words
// @access      Public
exports.getWords = (req, res, next)=>{
    res.status(200).json({success:true, message:'Get all words', data:words})
}

// @desc        Get single word
// @route       GET /api/v1/words/:id
// @access      Public
exports.getWord = (req, res, next)=>{
    res.status(200).json({success:true, message:'Get word', data:words.filter(word => word.word_id === req.params.id)})
}

// @desc        Create single word
// @route       POST /api/v1/words
// @access      Public
exports.postWord = (req, res, next)=>{
    words.push(JSON.parse(req.params.data))
    res.status(201).json({success:true, message:'Create new word', })
}

// @desc        Alter a word
// @route       PUT /api/v1/words/:id
// @access      Public
exports.putWord = (req, res, next)=>{
    res.status(200).json({success:true, message:`Display word ${req.params.id}`})
}

// @desc        Update a word
// @route       PATCH /api/v1/words/:id
// @access      Public
exports.patchWord = (req, res, next)=>{
    res.status(200).json({success:true, message:`Update word ${req.params.id}`})
}

// @desc        Delete a word
// @route       DELETE /api/v1/words/:id
// @access      Public
exports.deleteWord = (req, res, next)=>{
    res.status(200).json({success:true, message:'Delete word ${req.params.id}'})
}