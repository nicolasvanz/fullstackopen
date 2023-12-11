import { useState } from "react"

import blogService from "../services/blogs"

const Blog = ({ blog, handleBlogLike, handleDelete }) => {
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
          <div style={blogStyle} className="blogBrief">
            <div>
              {blog.title} {blog.author}
              <button onClick={toggleVisible}>view</button>
            </div>
          </div>
          :
          <div style={blogStyle} className="blogDetail">
            <p>{blog.title} {blog.author}<button onClick={toggleVisible}>hide</button></p>
            <p>{blog.url}</p>
            <p>likes {blog.likes}<button onClick={() => handleBlogLike(blog)}>like</button></p>
            <p>{blog?.user?.username}</p>
            {
              blogService.getUsername() === blog.user.username
              &&
              <button onClick={() => handleDelete(blog)} id="likeButton">remove</button>
            }
          </div>
      }
    </>
  )
}

const BlogList = ({ blogs, handleBlogLike, handleDelete }) => (
  <>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleBlogLike={handleBlogLike}
        handleDelete={handleDelete}
      />
    )}
  </>
)

export default BlogList