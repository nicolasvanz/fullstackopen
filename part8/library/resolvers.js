const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")

const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allGenres: async (root, args) => {
      const books = await Book.find({})
      const genres = books.map(book => book.genres).flat()
      const uniqueGenres = [... new Set(genres)]
      return uniqueGenres
    },
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
        throw new GraphQLError("wrong credentials", {
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

module.exports = resolvers