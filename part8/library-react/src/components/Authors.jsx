import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"

import { ALL_AUTHORS, EDIT_AUTHOR_BIRTH } from "../queries"

const SetBirthYearForm = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editBirth] = useMutation(EDIT_AUTHOR_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(name, year)
    editBirth({ variables: {name, setBornTo: Number(year) } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <label>name</label><input value={name} onChange={({ target }) => setName(target.value)} /> <br />
        <label>born</label><input value={year} onChange={({ target }) => setYear(target.value)} /> <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )

}

const Authors = () => {
  const authorsQuery = useQuery(ALL_AUTHORS)

  if (authorsQuery.loading) {
    return <div>loading...</div>
  }

  const authors = authorsQuery.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>   
        </thead>
        <tbody>
          {
            authors.map(author => {
              return (
                <tr key={author.name}>
                  <td>{author.name}</td>
                  <td>{author.born}</td>
                  <td>{author.bookCount}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <SetBirthYearForm />
    </div>
  )
}

export default Authors