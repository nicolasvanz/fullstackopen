const NewBlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  onSubmit
}) => (
  <>
    <h2>create new</h2>
    <form onSubmit={onSubmit}>
      <div>
        <label>title:</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          name="title"
        />
      </div>
      <div>
        <label>author:</label>
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          name="author"
        />
      </div>
      <div>
        <label>url:</label>
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          name="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  </>
)

export default NewBlogForm