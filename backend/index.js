const express = require('express')
require('express-async-errors')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const matchesRouter = require('./controllers/matches')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/matches', matchesRouter)

app.get('/', (req, res) => {
    res.send('<h1>Dartcounter</h1>')
  })

app.get('/user', (req, res) => {
    res.send('<h1>user</h1>')
  })

const url = process.env.MONGODB_URI;
console.log('Connecting to', url)

mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(8800, () => {
            console.log("Backend running")
        })
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error)
    })