const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const adminRoute = require('./routes/admin')

mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Connection active')
})

const app = new express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server Active on " + PORT)
})

app.use('/api/user', userRoute)
app.use('/api', authRoute)
app.use('/api/secure', adminRoute)