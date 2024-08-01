const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
    audiobooks: [AudioBook!]!
    videos: [Video!]!
  }
  
  type Book {
    id: ID!
    title: String!
    author: Author!
    pages: Int!
  }
  
  type Query {
    hello: String
    authors: [Author!]!
    books: [Book!]!
  }

  type AudioBook {
    id: ID
    title: String
    durationMinutes: Int
    author: Author
    }

  type Video {
    id: ID
    title: String
    durationMinutes: Int
    author: Author
  }
`);




// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Hello world!',
  authors: () => {
    // Fetch authors data from a data source (e.g., database)
    const authors = [
      {
        id: 1,
        name: 'J.K. Rowling',
        books: [
          { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', pages: 309 },
          { id: 2, title: 'Harry Potter and the Chamber of Secrets', pages: 341 },
        ],
        audiobooks: [
          { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone',  durationMinutes: 435 },
          { id: 2, title: 'Harry Potter and the Chamber of Secrets',  durationMinutes: 440 },
        ],
        videos: [
          { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone',  durationMinutes: 135 },
          { id: 2, title: 'Harry Potter and the Chamber of Secrets',  durationMinutes: 140 },
        ],
      },
      {
        id: 2,
        name: 'George R.R. Martin',
        books: [
          { id: 3, title: 'A Game of Thrones', pages: 694 },
          { id: 4, title: 'A Clash of Kings', pages: 768 },
        ],
        audiobooks: [
          { id: 3, title: 'A Game of Thrones',  durationMinutes: 435 },
          { id: 4, title: 'A Clash of Kings',  durationMinutes: 440 },
        ],
        videos: [
          { id: 3, title: 'A Game of Thrones',  durationMinutes: 145 },
          { id: 4, title: 'A Clash of Kings',  durationMinutes: 150 },
        ],
      },
    ];
    return authors;
  },
  book: () => {
    // Fetch books data from a data source (e.g., database)
    const books = [
      { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', author: 1, pages: 309 },
      { id: 2, title: 'Harry Potter and the Chamber of Secrets', author: 1, pages: 341 },
      { id: 3, title: 'A Game of Thrones', author: 2, pages: 694 },
      { id: 4, title: 'A Clash of Kings', author: 2, pages: 768 },
    ];
    return books;
  },
  audiobook: () => {
    const audiobooks = [
      { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', author: 1, durationMinutes: 435 },
      { id: 2, title: 'Harry Potter and the Chamber of Secrets', author: 1,  durationMinutes: 440 },
      { id: 3, title: 'A Game of Thrones', author: 2,  durationMinutes: 445 },
      { id: 4, title: 'A Clash of Kings', author: 2,  durationMinutes: 450 },
    ];
  },
  videos: () => {
    const videos = [
      { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', author: 1, durationMinutes: 135 },
      { id: 2, title: 'Harry Potter and the Chamber of Secrets', author: 1,  durationMinutes: 140 },
      { id: 3, title: 'A Game of Thrones', author: 2,  durationMinutes: 145 },
      { id: 4, title: 'A Clash of Kings', author: 2,  durationMinutes: 150 },
    ];
  },
};

const allowedOriginRegex = /^https?:\/\/localhost(:\d+)?$/;

const app = express();
app.use(cors({
  // origin: 'http://localhost:3000', // Replace with the allowed origin(s)
  origin: allowedOriginRegex,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 3600 // 1 hour
}));


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));



app.listen(4000, () => console.log('Server running on port 4000'));
