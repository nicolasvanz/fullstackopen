import { useState } from "react"
import { useQuery } from "@apollo/client"

import BooksTable from "./BooksTable"
import { ALL_BOOKS, ALL_GENRES } from "../queries"

const Books = () => {
  const genreFilterNullState = ''
  const [genreFilter, setGenreFilter] = useState(genreFilterNullState)

  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
  })
  const genresQuery = useQuery(ALL_GENRES)

  if (booksQuery.loading || genresQuery.loading) {
    return <div>loading...</div>
  }

  const books = booksQuery.data.allBooks
  const genres = genresQuery.data.allGenres

  const displayCurrentGenreFilter = () => {
    return genreFilter !== genreFilterNullState
      ?
      <p>in genre <b>{ genreFilter }</b></p>
      :
      null
  }

  return (
    <div>
      <h2>Books</h2>
      { displayCurrentGenreFilter() }
      <BooksTable books={books}/>
      {
        genres.map(genre => {
          return (
            <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
          )
        })
      }
    </div>
  )
}

export default Books