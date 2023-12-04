import { useState, useEffect, useRef } from 'react'

import BlogList from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notifyMessage, setNotifyMesssage] = useState(null)
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [newBlogTitle, setNewBlogTitle] = useState("")
  const [newBlogAuthor, setNewBlogAuthor] = useState("")
  const [newBlogUrl, setNewBlogUrl] = useState("")
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
      const user = await loginService.login({username, password})
      notify("user logged in")
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
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

  const createNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    try {
      const createdBlog = await blogService.create(newBlog)
      notify(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`)
      setBlogs(blogs.concat(createdBlog))
      newBlogRef.current.toggleVisibility()
    } catch (exception) {
      notify(`couldn't create blog: ${exception.response.data.error}`, false)
    }
  }

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={newBlogRef}>
        <NewBlogForm
          title={newBlogTitle}
          setTitle={setNewBlogTitle}
          author={newBlogAuthor}
          setAuthor={setNewBlogAuthor}
          url={newBlogUrl}
          setUrl={setNewBlogUrl}
          onSubmit={createNewBlog}
        />
      </Togglable>
    )
  }

  const addLikeToBlog = async (blog) => {
    const likedBlog = {...blog, likes: blog.likes + 1}
    
    const updatedBlog = await blogService
      .update(likedBlog)
    
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

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
          <BlogList blogs={blogs} handleBlogLike={addLikeToBlog}/>
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