const express = require("express");
const dotenv = require("dotenv");
const { log } = require("console");

dotenv.config({ path: "./config/config.env" });

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

const app = express();


app.get('/app/v1/words', (req, res)=>{
    res.status(200).json({success:true, message:'Get all words', data:words})
})
app.post('/app/v1/words', (req, res)=>{
    res.status(201).json({success:true, message:'Create new word'})
})
app.put('/app/v1/words/:id', (req, res)=>{
    res.status(200).json({success:true, message:`Display word ${req.params.id}`})
})
app.patch('/app/v1/words/:id', (req, res)=>{
    res.status(200).json({success:true, message:`Update word ${req.params.id}`})
})
app.delete('/app/v1/words/:id', (req, res)=>{
    res.status(200).json({success:true, message:'Delete word ${req.params.id}'})
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, log(`Server is running in ${process.env.NODE_ENV} mode on port:${PORT}`));
