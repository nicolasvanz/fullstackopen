import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBookForm from "./components/NewBookForm"
import LoginForm from "./components/LoginForm"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/authors" element={<Authors />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/newBook" element={<NewBookForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </>
  )
}

export default App
