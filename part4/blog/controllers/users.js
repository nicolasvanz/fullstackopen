const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

userRouter.get("/", async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response.status(400).send({ error: "missing password" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username, name, passwordHash
  })

  const savedUser = await newUser.save({ runValidators: true })

  response.status(201).json(savedUser)
})

module.exports = userRouter