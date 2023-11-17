require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Note = require("./models/note")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}


app.post("/api/notes", (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({error: "content missing"})
    }

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.get("/api/notes/:id", (request, response) => {
    Note.find(request.params.id).then(note => {
        response.json(note)
    })
})

app.get("/", (request, response) => {
    response.send("<h1>Hello world!!<h1>")
})

app.get("/api/notes", (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})