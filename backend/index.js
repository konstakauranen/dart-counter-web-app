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
const path = require('path')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(express.static('dist'))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/matches', matchesRouter)

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
  

const url = process.env.MONGODB_URI;
console.log('Connecting to', url)

mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB")
        const PORT = process.env.PORT || 8800
        app.listen(PORT, () => {
            console.log("Backend running on port", PORT)
        })
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error)
    })