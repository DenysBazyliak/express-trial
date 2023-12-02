const WordSchema = require("../models/Word");

// @desc        Get all words
// @route       GET /api/v1/words
// @access      Public
exports.getWords = async (req, res, next) => {
    try{
        const words = await WordSchema.find()
        res.status(200).json({
            success:true,
            data:words
        })
    } catch (err){
        res.status(500).json({
            success: false,
            err: err.message
        })
    }
};

// @desc        Get single word
// @route       GET /api/v1/words/:id
// @access      Public
exports.getWord = async (req, res, next) => {
    try{
        const word = await WordSchema.findById(req.params.id)

        if(!word) {
            return res.status(400).json({
                success: false
            })
        }
        res.status(200).json({
            success:true,
            data:word
        })
    } catch (err){
        res.status(400).json({
            success: false,
            err: err.message
        }
    )
}
}

// @desc        Create single word
// @route       POST /api/v1/words
// @access      Public
exports.postWord = async (req, res, next) => {
    try {
        const word = await WordSchema.create(req.body);
        res.status(201).json({
            success: true,
            data: word,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            err:err.message
        })
    }
};

// @desc        Alter a word
// @route       PUT /api/v1/words/:id
// @access      Public
exports.putWord = async (req, res, next) => {
    try{
        const word = await WordSchema.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        })
        if(!word){
            return res.status(400).json({
                success: false
            })
        }
        res.status(200).json({
            success:true,
            data:word
        })
    } catch (err){
        res.status(500).json({
            success: false,
            err: err.message
        }
    )
}
};

// @desc        Update a word
// @route       PATCH /api/v1/words/:id
// @access      Public
exports.patchWord = async (req, res, next) => {
    try{
        const word = await WordSchema.find(req.params.id, req.body, {
            new:true,
            runValidators:true
        })
        if(!word){
            return res.status(400).json({
                success: false
            })
        }
        res.status(200).json({
            success:true,
            data:word
        })
    } catch (err){
        res.status(500).json({
            success: false,
            err: err.message
        }
    )
}
};

// @desc        Delete a word
// @route       DELETE /api/v1/words/:id
// @access      Public
exports.deleteWord = async (req, res, next) => {
    try{
        await WordSchema.deleteOne(req.params.id)
        res.status(200).json({
            success:true
        })
    } catch (err){
        res.status(500).json({
            success: false,
            err: err.message
        }
    )
}
};
