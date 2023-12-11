const testingRouter = require("express").Router()

const Blog = require("../models/blog")
const User = require("../models/user")

testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.send(204)
})

module.exports = testingRouter