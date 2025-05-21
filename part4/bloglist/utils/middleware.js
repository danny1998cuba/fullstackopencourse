const jwt = require('jsonwebtoken')
const User = require("../models/user")

const errorHandler = (error, req, res, _) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token expired' })
    } else if (error.name === 'NotFound') {
        return res.status(404).json({ error: 'entity not found' })
    } else {
        return res.status(500).send({ error: error.message })
    }
}

const unhandledRoutes = (req, res) => {
    res.sendStatus(404)
}

const getTokenFromRequest = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    } else {
        req.token = null
    }

    next()
}

const userExtractor = async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)
        req.user = user

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { errorHandler, unhandledRoutes, getTokenFromRequest, userExtractor }