const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const Person = require('./models/note')

const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(cors())

morgan.token('body', req => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(resp => {
    res.json(resp)
  }).catch(e => next(e))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(resp => {
    if (resp) {
      res.json(resp)
    } else {
      res.sendStatus(404)
    }
  }).catch(e => next(e))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name) return next({ name: 'ValidationError', message: 'Must provide a name' })
  if (!name) return next({ name: 'ValidationError', message: 'Must provide a number' })

  // if (persons.some(p => p.name === name))
  //     return res.status(500).json({ error: 'name must be unique' })

  const newPerson = new Person({ name, number })
  newPerson.save().then(resp => {
    res.status(200).json(resp)
  }).catch(e => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  if (!name) return next({ name: 'ValidationError', message: 'Must provide a name' })
  if (!name) return next({ name: 'ValidationError', message: 'Must provide a number' })

  Person.findByIdAndUpdate(id, { name, number }, {
    new: true, runValidators: true, context: 'query',
  }).then(resp => {
    if (resp) {
      res.json(resp)
    } else {
      res.sendStatus(404)
    }
  }).catch(e => next(e))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(resp => {
    if (resp) {
      res.json(resp)
    } else {
      res.sendStatus(404)
    }
  }).catch(e => next(e))
})

app.get('/info', (req, res, next) => {
  Person.find({}).then(resp => {
    res.send(`
            <p>Phonebook has info for ${resp.length} people</p>
            <p>${new Date()}</p>
        `)
  }).catch(e => next(e))

})

// Error handler
app.use((error, req, res, _) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else {
    return res.status(500).send({ error: error.message })
  }
})

app.listen(PORT, () => console.log(`App running in http://localhost:${PORT}`))

module.exports = app