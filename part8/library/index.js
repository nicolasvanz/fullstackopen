require("dotenv").config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const _ = require("lodash")
const { v1: uuid } = require("uuid")
const { GraphQLError } = require("graphql")
const mongoose = require("mongoose")

const Author = require("./models/author")
const Book = require("./models/book")

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

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
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
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
      await Author.updateOne({ name: args.name }, { born: args.setBornTo}, { new: true })
        .catch((error) => {
          throw new GraphQLError('updating author failed', {
            extensions: {
              error
            }
          })
        })
      return await Author.findOne({ name: args.name })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})