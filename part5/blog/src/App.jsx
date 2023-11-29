import { useState, useEffect } from 'react'

import BlogList from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [notifyMessage, setNotifyMesssage] = useState(null)
  const [notifySuccess, setNotifySuccess] = useState(false)

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
      window.localStorage.setItem("user", JSON.stringify(user))
    } catch (exception) {
      notify("error logging in", false)
    }
  }

  return (
    <div>
      <Notification message={notifyMessage} success={notifySuccess} />
      {
        user &&
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in </p>
          <BlogList blogs={blogs}/>
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