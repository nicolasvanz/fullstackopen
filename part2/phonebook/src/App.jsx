import { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filterStr, setFilterStr] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.map(person => person.name).includes(newPerson.name))
      alert(`${newName} is already added to the phonebook`)
    else
      setPersons(persons.concat(newPerson))
  }

  const handleChangeFilter = (event) => {
    setFilterStr(event.target.value.toLowerCase())
  }

  const shownPersons = (filterStr === "")
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterStr))

  return (
    <div>
      <h2>Phonebook</h2>
      <label>filter shown with </label>
      <input value={filterStr} onChange={handleChangeFilter}/>
      <h1>add a new</h1>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} value={newName}/>
        </div>
        <div>
          number: <input onChange={(event) => setNewNumber(event.target.value)} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {shownPersons.map(person => <Person key={person.id} person={person}/>)}
    </div>
  )
}

export default App