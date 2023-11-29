const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")

const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

let creatorUserCredentials = null

const login = async (user = helper.user) => {
  const { username, password } = user
  const response = await api
    .post("/api/login")
    .send({ username, password })
    .expect(200)
  const token = response.body.token
  expect(token).toBeDefined()
  return `Bearer ${token}`
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const saltRounds = 10
  const passordHashedUsers = await Promise.all(helper.users.concat(helper.user)
    .map(async user => {
      const passordHashedUser = {
        ...user,
        passwordHash: await bcrypt.hash(user.password, saltRounds)
      }
      delete passordHashedUser.password
      return passordHashedUser
    })
  )
  await Promise.all(
    passordHashedUsers.map(async user => await new User(user).save())
  )
  const usersInDb = await helper.usersInDb()
  const creatorUser = usersInDb[0]
  const blogObjects = helper.blogs.map(blog => new Blog({
    ...blog,
    user: creatorUser.id
  }))
  await Promise.all(blogObjects.map(blog => blog.save()))
  const creatorUserLocal = helper.users.concat(helper.user).find(
    user => user.username === creatorUser.username
  )
  creatorUserCredentials = {
    username: creatorUserLocal.username,
    password: creatorUserLocal.password
  }
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("blogs: GET", () => {
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

describe("blogs: POST", () => {
  test("a valid blog can be created", async () => {
    const newBlog = { ...helper.listWithOneBlog[0] }
    const blogsAtBegin = await helper.blogsInDb()

    const response = await api
      .post("/api/blogs")
      .set("authorization", await login())
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
        .set("authorization", await login())
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      await helper.blogWasCreatedSuccessfully(blogsAtBegin, response)
      expect(response.body.likes).toBe(0)
    }
  )

  test("blog with missing 'title' or 'url' is NOT created", async () => {
    let newBlog = { ...helper.listWithOneBlog[0] }
    delete newBlog.title

    const blogsAtBegin = await helper.blogsInDb()
    const token = await login()

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", token)
      .expect(400)

    expect(await helper.blogsInDb()).toHaveLength(blogsAtBegin.length)

    newBlog = { ...helper.listWithOneBlog[0] }
    delete newBlog.url

    await api
      .post("/api/blogs")
      .set("authorization", token)
      .send(newBlog)
      .expect(400)

    expect(await helper.blogsInDb()).toHaveLength(blogsAtBegin.length)
  })

  test("a valid blog cannot be created with no logged in user", async () => {
    const newBlog = { ...helper.listWithOneBlog[0] }
    const blogsAtBegin = await helper.blogsInDb()

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtBegin).toEqual(blogsAtEnd)
  })
})

describe("blogs: DELETE", () => {
  test("of a blog whose id is valid by the creator returns 204", async () => {
    const blogsAtBegin = await helper.blogsInDb()
    const blogToDelete = { ...blogsAtBegin[0] }

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", await login(creatorUserCredentials))
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtBegin.length - 1)

    const urls = blogsAtEnd.map(blog => blog.url)
    expect(urls).not.toContain(blogToDelete.url)
  })

  test("of a blog whose id is valid NOT by the creator returns 401",
    async () => {
      const blogsAtBegin = await helper.blogsInDb()
      const blogToDelete = { ...blogsAtBegin[0] }
      const notCreatorUser = helper.users.concat(helper.user).find(
        user => user.username !== creatorUserCredentials.username
      )

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("authorization", await login(notCreatorUser))
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toEqual(blogsAtBegin)
    }
  )

  test("of a blog whose id is valid with no logged in user returns 401",
    async () => {
      const blogsAtBegin = await helper.blogsInDb()
      const blogToDelete = { ...blogsAtBegin[0] }

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toEqual(blogsAtBegin)
    }
  )
})

describe("blogs: PUT", () => {
  test("a blog whose id and data is valid can be updated", async () => {
    const blogsAtBegin = await helper.blogsInDb()

    const newBlogTitle = `this titled was modified ${helper.randomNumber()}`
    const blogToUpdate = { ...blogsAtBegin[0] }
    const editedBlog = { ...helper.listWithOneBlog[0], title: newBlogTitle }


    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(editedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(response.body.id).toEqual(blogToUpdate.id)
    expect(response.body.title).toEqual(editedBlog.title)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtBegin.length)

    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updatedBlog).toBeDefined()
    expect(updatedBlog.title).toBe(newBlogTitle)
  })

  test("of a blog whose id is NOT valid returns 200 with null content, \
not modifing the DB state", async () => {
    const blogsAtBegin = await helper.blogsInDb()

    const newBlogTitle = `this title was modified ${helper.randomNumber()}`
    const editedBlog = { ...helper.listWithOneBlog[0], title: newBlogTitle }

    const response = await api
      .put(`/api/blogs/${await helper.invalidBlogId()}`)
      .send(editedBlog)
      .expect(200)

    expect(response.body).toBe(null)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtBegin.length)

    blogsAtEnd.forEach(blog => {
      expect(blog.title).not.toBe(newBlogTitle)
    })
  })
})