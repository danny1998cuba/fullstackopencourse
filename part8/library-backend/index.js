const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4 } = require("uuid")

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

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
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
    type Book {
        title: String!,
        published: Int!,
        author: String!,
        id: ID!,
        genres: [String!]
    }

    type Author {
        name: String!,
        born: Int,
        bookCount: Int,
        id: ID!,
    }

    type Query {
        dummy: Int!
        bookCount: Int!
        authorCount: Int!
        allBooks(author:String, genre:String): [Book!]!
        allAuthors: [Author!]!
    }
    
    type Mutation {
        addBook(
            title: String!,
            published: Int!,
            author: String!,
            genres: [String!]!
        ): Book!
        editAuthor(name:String!, setBornTo:Int): Author
    }
`

const resolvers = {
    Query: {
        dummy: () => 0,
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            let filtered = books

            if (args.author) { filtered = filtered.filter(b => b.author === args.author) }
            if (args.genre) { filtered = filtered.filter(b => b.genres.includes(args.genre)) }

            return filtered
        },
        allAuthors: () => authors,
    },
    Book: {
        title: (root) => root.title,
        published: (root) => root.published,
        author: (root) => root.author,
        id: (root) => root.id,
        genres: (root) => root.genres,
    },
    Author: {
        name: (root) => root.name,
        born: (root) => root.born,
        bookCount: (root) => books.filter(b => b.author === root.name).length,
        id: (root) => root.id,
    },
    Mutation: {
        addBook: (root, args) => {
            if (authors.findIndex(a => a.name === args.author) === -1) {
                authors.push({ id: v4(), name: args.author })
            }

            const newBook = { id: v4(), ...args }
            books.push(newBook)

            return newBook;
        },
        editAuthor: (root, args) => {
            const author = authors.find(a => a.name === args.name)

            if (author) {
                const newAuthor = { ...author, born: args.setBornTo }
                authors = authors.map(a => a.name === args.name ? newAuthor : a)
                return newAuthor
            } else {
                return null
            }
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