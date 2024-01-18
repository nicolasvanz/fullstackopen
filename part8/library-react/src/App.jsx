import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Authors from "./components/Authors"
import Books from "./components/Books"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/authors" element={<Authors />}></Route>
        <Route path="/books" element={<Books />}></Route>
      </Routes>
    </>
  )
}

export default App
