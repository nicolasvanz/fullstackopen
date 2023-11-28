const blogRouter = require("express").Router()
const jwt = require("jsonwebtoken")

const Blog = require("../models/blog")
const User = require("../models/user")

const getLoggedInUserId = request => {
  const authorization = request.get("authorization")
  if (!(authorization && authorization.startsWith("Bearer "))) {
    return null
  }
  const encodedToken = authorization.replace("Bearer ", "")
  const decodedToken = jwt.verify(encodedToken, process.env.SECRET)

  return decodedToken.id
}

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post("/", async (request, response) => {
  const loggedInUserId = getLoggedInUserId(request)

  if (!loggedInUserId) {
    return response.status(401).send({ error: "not authorized" })
  }

  const user = await User.findById(loggedInUserId)
  const blog = new Blog({
    ...request.body,
    user: user.id
  })

  const savedBlog = await blog.save({ runValidators: true })
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
  const user = await User.findOne()
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...request.body, user: user.id },
    { new: true, runValidators: true }
  )
  response.json(updatedBlog)
})

module.exports = blogRouter