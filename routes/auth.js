const express = require('express')
const router = express.Router()

const { register, login, getMe } = require('../controllers/auth')
const { protect } = require('../middleware/auth')

const User = require('../models/User')



router
    .post('/auth/register', register)

router
    .post('/auth/login', login)

router
    .get('/auth/me', protect, getMe)

module.exports = router
