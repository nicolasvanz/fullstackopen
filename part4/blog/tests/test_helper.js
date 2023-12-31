const _ = require("lodash")
const Blog = require("../models/blog")
const User = require("../models/user")

const listWithOneBlog = [
  {
    title:"one random blog",
    author:"nicolas",
    url:"http;//github.com/nicolasvanz",
    likes: 5
  }
]

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

const users = [
  {
    name: "rootname",
    username: "root",
    password: "root123"
  },
  {
    name: "dummy",
    username: "dummyname",
    password: "123dummy123"
  }
]

const user = {
  name: "tempUserName",
  username: "tempUser",
  password: "temp123temp"
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogWasCreatedSuccessfully = async (blogsAtBegin, response) => {
  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtBegin.length + 1)

  const urls = blogsAtEnd.map(blog => blog.url)
  expect(urls).toContain(response.body.url)

  expect(response.body.id).toBeDefined()
}

const randomNumber = () => Math.random() * 1000

const invalidBlogId = async () => {
  const user = await User.findOne()

  const blog = new Blog({
    ...listWithOneBlog[0],
    title: `random title ${randomNumber}`,
    user: user.id
  })
  const savedBlog = await blog.save()
  const id = savedBlog.id
  await Blog.findByIdAndDelete(id)

  return id
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((acc, curr) => curr.likes + acc, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  return blogs.length !== 0
    ? blogs.reduce(
      (acc, curr) => curr.likes < acc.likes ? acc : curr
    )
    : {}
}

const mostBlogs = (blogs) => {
  return blogs.length !== 0
    ? _.maxBy(_(blogs)
      .groupBy("author")
      .map((objs, key) => ({
        "author": key,
        "blogs": objs.length
      }))
      .value(), author => author.blogs
    )
    : {}
}

const mostLikes = (blogs) => {
  return blogs.length !== 0
    ? _.maxBy(_(blogs)
      .groupBy("author")
      .map((objs, key) => ({
        "author": key,
        "likes": _.sumBy(objs, "likes")
      }))
      .value(), author => author.likes
    )
    : {}
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  listWithOneBlog,
  blogs,
  user,
  users,
  blogsInDb,
  usersInDb,
  blogWasCreatedSuccessfully,
  randomNumber,
  invalidBlogId,
}