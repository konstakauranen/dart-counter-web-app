const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')

userRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ error: 'User not found'})
    }
    res.status(200).json(user)
})

module.exports = userRouter