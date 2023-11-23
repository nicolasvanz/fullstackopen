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

describe("GET", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.blogs.length)
  })
})

describe("POST", () => {
  test("a blog can be created", async () => {
    const newBlog = helper.listWithOneBlog[0]
    const blogsAtBegin = await helper.blogsInDb()

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    await helper.blogWasCreatedSuccessfully(blogsAtBegin, response)
  })

  test("if 'likes' property is missing, it will default to zero",
    async () => {
      const newBlog = helper.listWithOneBlog[0]
      delete newBlog.likes
      const blogsAtBegin = await helper.blogsInDb()

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      await helper.blogWasCreatedSuccessfully(blogsAtBegin, response)
      expect(response.body.likes).toBe(0)
    }
  )

  test("blog with missing 'title' or 'url' is NOT created", async () => {
    let newBlog = helper.listWithOneBlog[0]
    delete newBlog.title

    const blogsAtBegin = await helper.blogsInDb()

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)

    expect(await helper.blogsInDb()).toHaveLength(blogsAtBegin.length)

    newBlog = helper.listWithOneBlog[0]
    delete newBlog.url

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)

    expect(await helper.blogsInDb()).toHaveLength(blogsAtBegin.length)
  })
})

describe("DELETE", () => {
  test("a blog whose id is valid can be deleted", async () => {
    const blogsAtBegin = await helper.blogsInDb()
    const blogToDelete = blogsAtBegin[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtBegin.length - 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).not.toContain(blogToDelete.url)
  })

  test("a blog whose id is invalid returns 400 on deletion", async () => {
    const blogsAtBegin = await helper.blogsInDb()
    const randomInvalidId = Math.random*1000

    await api
      .delete(`/api/blogs/${randomInvalidId}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtBegin.length)

    const idsAtBegin = blogsAtBegin.map(blog => blog.id)
    const idsAtEnd = blogsAtBegin.map(blog => blog.id)

    idsAtBegin.forEach(id => {
      expect(idsAtEnd).toContain(id)
    })
  })
})