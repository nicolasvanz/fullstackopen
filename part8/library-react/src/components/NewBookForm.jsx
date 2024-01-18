import { useMutation } from "@apollo/client"
import { useState } from "react"

import { ALL_AUTHORS, CREATE_BOOK, ALL_BOOKS } from "../queries"

const NewBookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })
  
  const handleSubmit = (event) => {
    event.preventDefault()
    
    createBook({ variables: { title, author, published: Number(published), genres } })
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenre('')
    setGenres([])
  }

  const handleAddGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>title</label><input value={title} onChange={({ target }) => setTitle(target.value)} /> <br />
        <label>author</label><input value={author} onChange={({ target }) => setAuthor(target.value)} /> <br />
        <label>published</label><input value={published} onChange={({ target }) => setPublished(target.value)} /> <br />
        <input value={genre} onChange={({ target }) => setGenre(target.value)} /> <button type="button" onClick={handleAddGenre}>add genre</button> <br />
        genres:
        {
          genres.join(" ")
        }
        <br />
        <button type="submit">create book</button>
      </form>
    </div>
  )

}

export default NewBookForm