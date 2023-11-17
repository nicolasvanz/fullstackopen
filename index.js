require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()

const PORT= process.env.PORT || 3001

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

const generateNewRandomId = () => Math.floor(Math.random() * 10000)

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request, response) => {
  Person.find(request.params.id).then(person =>
    response.json(person)
  )
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