const jwt = require('jsonwebtoken')
const matchesRouter = require('express').Router()
const Match = require('../models/match')
const User = require('../models/user')

// Function to extract token from request headers
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

matchesRouter.get('/', async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET)
    if (!decodedToken.userId) {
        return res.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.userId).populate('matches')

    const userMatches = user.matches
    return res.json(userMatches)
})

matchesRouter.get('/:matchId', async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET)

    if (!decodedToken.userId) {
        return res.status(401).json({ error: 'Invalid token' })
    }

    const match = await Match.findById(req.params.matchId)

    if (!match) {
        return res.status(404).json({ error: 'Match not found' })
    }

    if (match.player1.toString() !== decodedToken.userId.toString()) {
        return res.status(403).json({ error: 'Unauthorized access' })
    }

    return res.json(match)
})

matchesRouter.post('/', async (req, res) => {
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET)

    if (!decodedToken.userId) {
        return res.status(401).json({ error: 'Invalid token' })
    }

    const user = await User.findById(decodedToken.userId)

    const newMatch = new Match({
        player1: user.username,
        player2: body.player2,
        player1Legs: body.player1Legs,
        player2Legs: body.player2Legs,
        player1Average: body.player1Average,
        player2Average: body.player2Average,
        player1HighestFinish: body.player1HighestFinish,
        player2HighestFinish: body.player2HighestFinish
    })

    await newMatch.save()

    // Update users stats
    user.matches = user.matches.concat(newMatch._id)
    user.allTimeAverage = ((user.allTimeAverage * user.matchesPlayed) + parseInt(body.player1Average))/ (user.matchesPlayed + 1)
    user.highestFinish = Math.max(user.highestFinish, body.player1HighestFinish)
    user.matchesPlayed += 1
    await user.save()

    return res.status(201).json(newMatch);
})

module.exports = matchesRouter