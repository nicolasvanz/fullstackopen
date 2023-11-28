const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = require("../app")
const User = require("../models/user")
const helper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  const passordHashedUsers = await Promise.all(helper.users.map(async user => {
    const passordHashedUser = {
      ...user,
      passwordHash: await bcrypt.hash(user.password, saltRounds)
    }
    delete passordHashedUser.password
    return passordHashedUser
  }))
  await Promise.all(passordHashedUsers.map(async user => await new User(user).save()))
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("login: POST", () => {
  test("of a user with valid credentials returns 200 with valid token",
    async () => {
      const { username, password } = helper.users[0]
      const userInDb = await User.findOne({ username })

      const response = await api
        .post("/api/login")
        .send({ username, password })
        .expect(200)

      expect(response.body.token).toBeDefined()
      const decodedToken = jwt.verify(response.body.token, process.env.SECRET)
      expect(decodedToken.id).toBeDefined()

      const user = await User.findById(decodedToken.id)
      expect(user.id).toEqual(userInDb.id)
    }
  )

  test("of a user with invalid username returns 401", async () => {
    const user = {
      name: helper.users[0].name,
      username: `randomUserName${helper.randomNumber()}`
    }

    const response = await api
      .post("/api/login")
      .send(user)
      .expect(401)

    expect(response.body.token).not.toBeDefined()
  })

  test("of a user with invalid password returns 401", async () => {
    const user = {
      username: helper.users[0].name,
      password: `incorretPassword${helper.randomNumber()}`
    }

    const response = await api
      .post("/api/login")
      .send(user)
      .expect(401)

    expect(response.body.token).not.toBeDefined()
  })
})