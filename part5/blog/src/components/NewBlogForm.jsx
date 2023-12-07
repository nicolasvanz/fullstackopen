import { useState } from "react"

const NewBlogForm = ({
  createBlogFn
}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title, author, url
    }
    createBlogFn(newBlog)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="title"
            placeholder="title"
          />
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="author"
            placeholder="author"
          />
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="url"
            placeholder="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default NewBlogForm