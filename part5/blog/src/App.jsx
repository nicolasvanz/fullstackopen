import { useState, useEffect, useRef } from "react"

import BlogList from "./components/Blog"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notifyMessage, setNotifyMesssage] = useState(null)
  const [notifySuccess, setNotifySuccess] = useState(false)
  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user")
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.setUsername(user.username)
    }
  }, [])

  const notify = (message, success = true) => {
    setNotifyMesssage(message)
    setNotifySuccess(success)
    setTimeout(() => {
      setNotifyMesssage(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      notify("user logged in")
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
      blogService.setUsername(user.username)
      window.localStorage.setItem("user", JSON.stringify(user))
    } catch (exception) {
      notify(`Couldn't log in: ${exception.response.status} - \
${exception.response.data.error}`, false)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("user")
    setUser(null)
    blogService.setToken(null)
  }

  const createNewBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      notify(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`)
      setBlogs(blogs.concat(createdBlog))
      newBlogRef.current.toggleVisibility()
    } catch (exception) {
      notify(`couldn"t create blog: ${exception.response.data.error}`, false)
    }
  }

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={newBlogRef}>
        <NewBlogForm
          createBlogFn={createNewBlog}
        />
      </Togglable>
    )
  }

  const addLikeToBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }

    const updatedBlog = await blogService
      .update(likedBlog)

    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  const handleDelete = async (blogToDelete) => {
    try {
      if (!window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )) {
        return
      }
      await blogService
        .remove(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      notify(`${blogToDelete.title} successfully deleted`)
    } catch (exception) {
      notify(
        `Couldn't remove the blog: ${exception?.response?.data?.error}`,
        false
      )
    }
  }

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Notification message={notifyMessage} success={notifySuccess} />
      {
        user &&
        <div>
          <h2>blogs</h2>
          <div>
            <label>{user.name} logged in </label>
            <button onClick={handleLogout}>logout</button>
          </div>
          {newBlogForm()}
          <BlogList
            blogs={blogs}
            handleBlogLike={addLikeToBlog}
            handleDelete={handleDelete}
          />
        </div>
      }
      {
        !user &&
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      }
    </div>
  )
}

export default App