import { useQuery } from "@apollo/client"

import BooksTable from "./BooksTable"
import { CURRENT_USER } from "../queries"
import { ALL_BOOKS } from "../queries"

const Recommended = () => {
  const currentUserQuery = useQuery(CURRENT_USER)

  const currentUser = currentUserQuery?.data?.me

  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: currentUser?.favoriteGenre },
    skip: currentUserQuery.loading
  })
  
  if (currentUserQuery.loading) {
    return <p>loading ...</p>
  }

  if (booksQuery.loading) {
    return <div>loading...</div>
  }

  const recommendedBooks = booksQuery.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{currentUser.favoriteGenre}</b></p>
      <BooksTable books={recommendedBooks}/>
    </div>
  )
}

export default Recommended