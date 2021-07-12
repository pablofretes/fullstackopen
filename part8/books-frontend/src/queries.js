import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String){
      allBooks(genre: $genre){
        title
        author {
          name
          born
          bookCount
        }
        published
        genres
      }
  }
`

export const ALL_GENRES = gql`
  query {
    allBooks{
      genres
    }
  }
` 

export const NEW_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $genres: [String!], $published: Int!) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author {
        name
      }
      genres
      published
      id
    }
  }
`

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
        bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`