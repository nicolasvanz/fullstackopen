const BooksTable = ({ books }) => {
  return (
    <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>   
        </thead>
        <tbody>
          {
            books.map(book => {
              return (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
  )
}

export default BooksTable