const express = require("express")
const morgan = require("morgan")

const app = express()
app.use(morgan("common"))

PORT=3001

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateNewRandomId = () => Math.floor(Math.random() * 10000)

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (!person) {
    response.status(404).end()
  } else {
    response.json(person)
  }
})

app.get("/info", (request, response) => {
  response.send(
    `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `  
  )
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: "'name' missing"
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: "'number' missing"
    })
  }

  const nameIsUnique = persons.find(
    person => person.name === body.name
  ) === undefined
  
  if (!nameIsUnique) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  const newPerson = {
    id: generateNewRandomId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})