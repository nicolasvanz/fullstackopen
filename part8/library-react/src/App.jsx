import { Routes, Route } from "react-router-dom"
import { useQuery } from "@apollo/client"

import Navbar from "./components/Navbar"
import Authors from "./components/Authors"
import { ALL_AUTHORS } from "./queries"

function App() {
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 5000
  })

  if (authors.loading) {
    return <div>loading...</div>
  }


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/authors" element={<Authors authors={authors.data.allAuthors}/>}></Route>
      </Routes>
    </>
  )
}

export default App
