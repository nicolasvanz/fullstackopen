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

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.find(request.params.id)
    .then(person =>
      response.json(person)
    )
    .catch(error => next(error))
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

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: "unknown endpoint"})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
      return response.status(400).send({error: "malformatted id"})
  }
  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})