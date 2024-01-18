import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"

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
    </div>
  )
}

export default Authors