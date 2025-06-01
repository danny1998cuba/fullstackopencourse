import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    author
    id
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    bookCount
    id
  }
}
`