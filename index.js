const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

// Enable body parser

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// set middleware
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log('Server started'))