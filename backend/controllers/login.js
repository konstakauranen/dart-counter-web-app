const loginRouter = require("express").Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Registration
loginRouter.post('/register', async (req, res) => {
    const {username, password} = req.body
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = await new User({
        username: username,
        password: passwordHash
    })

    const user = await newUser.save()
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    res.status(201).json({ username: user.username, token})

})

// Login
loginRouter.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({ username })

    if (!user) {
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) {
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    res.status(200).json({ username: user.username, token })
})

module.exports = loginRouter