import { Link } from "react-router-dom"

const Navbar = () => {
  const paddingStyle = {
    padding: "5px",
  }
  return (
    <div style={{display: "flex"}}>
      <Link to={"/authors"} style={paddingStyle}>
        authors
      </Link>
      <Link to={"/books"} style={paddingStyle}>
        books
      </Link>
    </div>
  )
}

export default Navbar