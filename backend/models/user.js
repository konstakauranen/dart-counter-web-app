const mongoose = require('mongoose')

userSchema = mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,
        min: 3,
        max: 25
    }, 
    password: {
        type: String, 
        required: true, 
        min: 8
    },
    highestFinish: {
        type: Number,
        default: 0
    },
    matchesPlayed: {
        type: Number,
        default: 0
    },
    allTimeAverage: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 180
    },
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }],
})

module.exports = mongoose.model('User', userSchema)