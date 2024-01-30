import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [login, loginResponse] = useMutation(LOGIN)

  useEffect(() => {
    if (loginResponse.data) {
      const token = loginResponse.data.login.value
      localStorage.setItem('library-user-token', token)
      window.location.reload(false)
    }
  }, [loginResponse.data])  

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username: name, password } })
    setName('')
    setPassword('')
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        name <input value={name} onChange={({ target }) => setName(target.value)} />
        <br />
        password <input value={password} onChange={({ target }) => setPassword(target.value)} />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm