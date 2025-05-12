const errorHandler = (error, req, res, _) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else {
        return res.status(500).send({ error: error.message })
    }
}

const unhandledRoutes = (req, res) => {
    res.sendStatus(404)
}

module.exports = { errorHandler, unhandledRoutes }