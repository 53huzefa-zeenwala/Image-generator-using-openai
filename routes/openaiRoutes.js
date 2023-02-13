const express = require('express')
const router = express.Router()
const { generateImage } = require('../controller/openai.controller')

router.post('/generate', generateImage)

module.exports = router