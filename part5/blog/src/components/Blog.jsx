import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <>
      {
        !visible
        ?
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author}
            <button onClick={toggleVisible}>view</button>
          </div>
        </div>
        :
        <div style={blogStyle}>
          <p>{blog.title} <button onClick={toggleVisible}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes {blog.likes}<button>like</button></p>
          <p>{blog.author}</p>
        </div>
      }
    </>
  )
}

const BlogList = ({ blogs }) => (
  <>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </>
)

export default BlogList