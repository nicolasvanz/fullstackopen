const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("give password as argument")
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://nicolasvanz:${password}@fullstackopen.f2fxrgj.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model("Person", personSchema)

switch(process.argv.length) {
    case 3:
        Person.find({}).then(result => {
            console.log("Phonebook:")
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
        break
    case 5:
        const person = new Person({
            name: process.argv[3],
            number: Number(process.argv[4])
        })
        person.save().then(result => {
            console.log(`added ${person.name} number ${person.number} to the phonebook`)
            mongoose.connection.close()
        })
        break
    default:
        console.log("incorrect usage")
        mongoose.connection.close()
}