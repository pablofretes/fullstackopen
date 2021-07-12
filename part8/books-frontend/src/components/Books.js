import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')

  const [getBooks, result] = useLazyQuery(ALL_BOOKS, { variables: { genre: genre } })
  const genresResult = useQuery(ALL_GENRES)

  useEffect(() => {
    getBooks()
  }, [genre]) //eslint-disable-line

  if(result.loading) {
    return <div>Loading...</div>
  }

  if (!props.show) {
    return null
  }

  const genres = genresResult.data.allBooks
  let genresArray = genres.reduce((array, item) => {
    let newArray = []
    item.genres.map(g => newArray.push(g.split(', ')))
    newArray.map(newItem => {
      let element = newItem.pop()
      return array.push(element)
    })
    return array
  }, [])

  console.log(genresArray)
  const books = result.data.allBooks
  console.log(books)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genresArray.filter((v, i) => genresArray.indexOf(v) === i).map(g => <button key={g} type='button' onClick={() => setGenre(g)}>{g}</button>)}
      <button type='button' onClick={() => setGenre('')}>All genres</button>
    </div>
  )
}

export default Books