const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
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
      },
      {
        id: 2,
        name: 'George R.R. Martin',
        books: [
          { id: 3, title: 'A Game of Thrones', pages: 694 },
          { id: 4, title: 'A Clash of Kings', pages: 768 },
        ],
      },
    ];
    return authors;
  },
  books: () => {
    // Fetch books data from a data source (e.g., database)
    const books = [
      { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', author: 1, pages: 309 },
      { id: 2, title: 'Harry Potter and the Chamber of Secrets', author: 1, pages: 341 },
      { id: 3, title: 'A Game of Thrones', author: 2, pages: 694 },
      { id: 4, title: 'A Clash of Kings', author: 2, pages: 768 },
    ];
    return books;
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => console.log('Server running on port 4000'));
