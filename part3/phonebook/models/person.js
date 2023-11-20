const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

console.log(`connecting to ${url}`)
mongoose.connect(url)
    .then(response => {
        console.log("connected to MongoDB")
    })
    .catch(error => {
        console.log(`couldn't connect to MongoDB: ${error.message}`)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: Number
})

mongoose.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)

