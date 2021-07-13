import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE } from '../queries'

const Recommendations = (props) => {
    const result = useQuery(FAVORITE)
    
    let genre;
    
    if(!result.loading){
        genre = result.data.favoriteGenre
    }
    
    const getBooks = useQuery(ALL_BOOKS, { variables: { genre: genre } })
    
    if(result.loading){
        return <div>Loading...</div>
    }

    if (!props.show) {
        return null
    }

    const books = getBooks.data.allBooks

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
      </div>
    )
}

export default Recommendations