const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.blogs.map(blog => new Blog(blog))
  await Promise.all(blogObjects.map(blog => blog.save()))
})

afterAll(async () => {
  await mongoose.connection.close()
})

test("GET: blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("GET: all blogs are returned", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(helper.blogs.length)
})

test("POST: a blog can be created", async () => {
  const newBlog = helper.listWithOneBlog[0]
  const blogsAtBegin = await helper.blogsInDb()

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtBegin.length + 1)

  const urls = blogsAtEnd.map(blog => blog.url)
  expect(urls).toContainEqual(newBlog.url)

  expect(response.body.id).toBeDefined()
})
