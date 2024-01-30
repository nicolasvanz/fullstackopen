require("dotenv").config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const _ = require("lodash")
const { v1: uuid } = require("uuid")
const { GraphQLError } = require("graphql")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const MONGODB_URI = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

console.log("connecting to", MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb")
  })
  .catch(error => {
    console.log("error connecting to mongodb:", error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type AuthorWithoutBookCount {
    name: String!
    born: Int
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): AuthorWithoutBookCount
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let queryParams = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        queryParams["author"] = author._id
      }
      if (args.genre) {
        queryParams["genres"] = args.genre
      }
      return Book.find(queryParams).populate("author")
    },
    allAuthors: async () => {
      return Author.find()
    },
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('unauthorized')
      }

      let savedAuthor = await Author.findOne({ name: args.author })
      if (!savedAuthor) {
        const newAuthor = new Author({ name: args.author, bookCount: 0 })
        savedAuthor = await newAuthor.save()
          .catch((error) => {
            throw new GraphQLError('saving author failed', {
              extensions: {
                error
              }
            })
          })
      }

      savedAuthor = await Author.findByIdAndUpdate(savedAuthor._id, {
        ...savedAuthor._doc,
        bookCount: savedAuthor.bookCount + 1
      }, {
        new: true
      })

      const newBook = new Book({ ...args, author: savedAuthor })
      const savedBook = await newBook.save()
        .catch((error) => {
          throw new GraphQLError('saving book failed', {
            extensions: {
              error
            }
          })
        })

      return savedBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('unauthorized')
      }
      await Author.updateOne({ name: args.name }, { born: args.setBornTo}, { new: true })
        .catch((error) => {
          throw new GraphQLError('updating author failed', {
            extensions: {
              error
            }
          })
        })
      return await Author.findOne({ name: args.name })
    },
    createUser: async (root, args) => {
      const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      const savedUser = await newUser.save()
        .catch((error) => {
          throw new GraphQLError("saving user failed", {
            extensions: {
              error
            }
          })
        })
      return savedUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      const credentialsAreValid = user && args.password === "secret"
      if (!credentialsAreValid) {
        throw new GraphQLError("worng credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})