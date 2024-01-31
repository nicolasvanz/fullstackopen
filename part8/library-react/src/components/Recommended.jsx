import { useQuery } from "@apollo/client"

import BooksTable from "./BooksTable"
import { CURRENT_USER } from "../queries"
import { ALL_BOOKS } from "../queries"

const Recommended = () => {
  const currentUserQuery = useQuery(CURRENT_USER)
  const booksQuery = useQuery(ALL_BOOKS)
  
  if (currentUserQuery.loading) {
    return <p>loading ...</p>
  }

  if (booksQuery.loading) {
    return <div>loading...</div>
  }

  const books = booksQuery.data.allBooks

  const currentUser = currentUserQuery.data.me

  const filteredBooks = currentUser.favoriteGenre
    ? books.filter(book => 
        book.genres.includes(currentUser.favoriteGenre)
      )
    : books

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{currentUser.favoriteGenre}</b></p>
      <BooksTable books={filteredBooks}/>
    </div>
  )
}

export default Recommended