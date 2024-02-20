const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
    player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    player2: {
        type: String,
        required: true
    },
    player1Legs: { type: Number, default: 0 },
    player2Legs: { type: Number, default: 0 },
    player1Average: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 167.0
    },
    player2Average: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 167.0
    },
    player1HighestFinish: { type: Number, default: 0 },
    player2HighestFinish: { type: Number, default: 0 },
})

module.exports = mongoose.model('Match', matchSchema)