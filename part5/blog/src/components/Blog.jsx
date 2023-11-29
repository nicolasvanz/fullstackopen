const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const BlogList = ({ blogs }) => (
  <>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </>
)

export default BlogList