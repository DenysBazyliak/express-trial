const express = require('express')
const router = express.Router()

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

router.get('/', (req, res)=>{
    res.status(200).json({success:true, message:'Get all words', data:words})
})
router.post('/', (req, res)=>{
    res.status(201).json({success:true, message:'Create new word'})
})
router.put('/:id', (req, res)=>{
    res.status(200).json({success:true, message:`Display word ${req.params.id}`})
})
router.patch('/:id', (req, res)=>{
    res.status(200).json({success:true, message:`Update word ${req.params.id}`})
})
router.delete('/:id', (req, res)=>{
    res.status(200).json({success:true, message:'Delete word ${req.params.id}'})
})

module.exports = router;