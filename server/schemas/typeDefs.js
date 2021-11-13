const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

   input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }

  type User {
    _id: ID
    username: String!
    email: String!
   bookCount: Int
   savedBook: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    titled: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;