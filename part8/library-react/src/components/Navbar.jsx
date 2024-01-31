import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [token, setToken] = useState(null)

  const paddingStyle = {
    padding: "5px",
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [])

  return (
    <div style={{display: "flex"}}>
      <Link to={"/authors"} style={paddingStyle}>
        authors
      </Link>
      <Link to={"/books"} style={paddingStyle}>
        books
      </Link>
      {
        token
          ?
          <>
          <Link to={"/newBook"} style={paddingStyle}>
            add book
          </Link>
          <Link to={"/recommended"} style={paddingStyle}>
            recommended
          </Link>
          <button onClick={handleLogout}>logout</button>
          </>
          :
          <Link to={"/login"} style={paddingStyle}>
            login
          </Link>
      }
    </div>
  )
}

export default Navbar