const express = require('express')
const router = express.Router()

const { register, login, getMe, forgotPassword } = require('../controllers/auth')
const { protect } = require('../middleware/auth')

const User = require('../models/User')



router
    .post('/auth/register', register)

router
    .post('/auth/login', login)

router
    .get('/auth/me', protect, getMe)

router
    .post('/auth/forgot-password', forgotPassword)

module.exports = router
