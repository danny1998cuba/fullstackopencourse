const express = require('express')
const morgan = require('morgan');

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const PORT = 3001

const app = express()
app.use(express.json());

morgan.token('body', req => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const entry = persons.find(p => p.id === req.params.id)

    if (!entry) {
        res.sendStatus(404)
    } else {
        res.json(entry)
    }
})

app.post("/api/persons", (req, res) => {
    const { name, number } = req.body

    if (!name) return res.status(400).json({ error: "Must provide a name" })
    if (!number) return res.status(400).json({ error: "Must provide a number" })

    if (persons.some(p => p.name === name))
        return res.status(500).json({ error: "name must be unique" })

    persons.push({
        name, number,
        id: String(Math.ceil(Math.random() * 500000))
    })

    res.sendStatus(200)
})

app.delete("/api/persons/:id", (req, res) => {
    if (!persons.some(p => p.id === req.params.id)) {
        res.sendStatus(404)
    } else {
        persons = persons.filter(p => p.id !== req.params.id)
        res.sendStatus(200)
    }
})

app.get("/info", (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.listen(PORT, () => console.log(`App running in http://localhost:${PORT}`))