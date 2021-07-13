const { ApolloServer, UserInputError ,gql, AuthenticationError, PubSub } = require('apollo-server')
const config = require('./config')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const JWT_SECRET = 'superSecretKey'

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
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
      genres: [String!]
  }

  type Author {
      name: String
      born: Int
      bookCount: Int
      id: ID!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author]
      me: User
      favoriteGenre: String!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if(!args.genre && args.author){
          const existingAuthor = await Author.findOne({ name: args.author })
          console.log(existingAuthor)
          return await Book.find({ author: existingAuthor._id }).populate('author', { name: 1, born: 1 })
        }

        if(!args.author && args.genre){
          return await Book.find({ genres: { $in: [args.genre] } }).populate('author', { name: 1, born: 1 })
        }

        if(args.author && args.genre){
          const existingAuthor = await Author.findOne({ name: args.author })
          return await Book.find({ author: existingAuthor._id, genres: args.genre }).populate('author', { name: 1, born: 1 })
        }

        if(!args.author && !args.genre){
          return await Book.find({}).populate('author', { name: 1 })
        }

        return []
    },
      allAuthors: () => Author.find({}),
      favoriteGenre: (root, args, { currentUser }) => currentUser.favoriteGenre
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author:{ $in: [root._id] } })
      const count = books.length
      return count
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })
      const existingBook = await Book.findOne({ title: args.title })

      if(existingBook){
        throw new UserInputError('That book is already in the database!', {
          invalidArgs: args.title,
        })
      }

      if(!author){
        author = await new Author({ name: args.author })
        try{
          await author.save()
        } catch (error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
          }) 
        }
      }

      const book = new Book({ ...args, author: author._id })

      try{
        await book.save()
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })

      if(!author){
        return null
      }

      author.born = args.setBornTo

      try{
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      try{
        await user.save()
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'superSecret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})