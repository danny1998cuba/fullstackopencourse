import { gql } from "@apollo/client"

export const GET_AUTHORS = gql`
query {
  authors: allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const GET_BOOKS = gql`
query AllBooks($author: String, $genre: String) {
  books: allBooks(author: $author, genre: $genre) {
    author
    genres
    id
    published
    title
  }
}
`