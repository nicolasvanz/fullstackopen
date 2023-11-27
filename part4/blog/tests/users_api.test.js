const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")

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

describe("users: GET", () => {
  test("of all users returns 200", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(response.body).toHaveLength((await helper.usersInDb()).length)
  })
})

describe("users: POST", () => {
  test("of a valid user data returns 201", async () => {
    const validUser = helper.user
    const usersAtBegin = await helper.usersInDb()

    const response = await api
      .post("/api/users")
      .send(validUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtBegin.length + 1)
    expect(response.body.username).toBe(validUser.username)
    expect(usersAtEnd).toContainEqual(response.body)
  })

  test("of user missing username returns 400", async () => {
    const usersAtBegin = await helper.usersInDb()
    const invalidUser = { ...helper.user }
    delete invalidUser.username

    await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)

    expect(await helper.usersInDb()).toEqual(usersAtBegin)
  })

  test("of a user missing password returns 400", async () => {
    const usersAtBegin = await helper.usersInDb()
    const invalidUser = { ...helper.user }
    delete invalidUser.password

    await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)

    expect(await helper.usersInDb()).toEqual(usersAtBegin)
  })

  test("of a user whose password is not long enough returns 400", async () => {
    const usersAtBegin = await helper.usersInDb()
    const invalidUser = {
      ...helper.user,
      password: "ab"
    }

    await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)

    expect(await helper.usersInDb()).toEqual(usersAtBegin)
  })

  test("of a user whose username is not long enough returns 400", async () => {
    const usersAtBegin = await helper.usersInDb()
    const invalidUser = {
      ...helper.user,
      username: "ab"
    }

    await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)

    expect(await helper.usersInDb()).toEqual(usersAtBegin)
  })

  test("of a user whose username is not unique returns 400", async () => {
    const usersAtBegin = await helper.usersInDb()
    const invalidUser = {
      ...helper.user,
      username: helper.users[0].username
    }

    await api
      .post("/api/users")
      .send(invalidUser)
      .expect(400)

    expect(await helper.usersInDb()).toEqual(usersAtBegin)
  })
})