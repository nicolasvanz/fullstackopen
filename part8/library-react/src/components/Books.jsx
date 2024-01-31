import { useState } from "react"
import { useQuery } from "@apollo/client"

import BooksTable from "./BooksTable"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  const genreFilterNullState = ''
  const [genreFilter, setGenreFilter] = useState(genreFilterNullState)
  const booksQuery = useQuery(ALL_BOOKS)

  if (booksQuery.loading) {
    return <div>loading...</div>
  }

  const books = booksQuery.data.allBooks

  const displayCurrentGenreFilter = () => {
    return genreFilter !== genreFilterNullState
      ?
      <p>in genre <b>{ genreFilter }</b></p>
      :
      null
  }

  const allGenres = () => {
    const genres = books.map(b => b.genres).flat()
    const uniqueGenres = [... new Set(genres)]
    return uniqueGenres
  }

  const filteredBooks = genreFilter !== genreFilterNullState
    ? books.filter(book => book.genres.includes(genreFilter))
    : books

  return (
    <div>
      <h2>Books</h2>
      { displayCurrentGenreFilter() }
      <BooksTable books={filteredBooks}/>
      {
        allGenres().map(genre => {
          return (
            <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
          )
        })
      }
    </div>
  )
}

export default Books