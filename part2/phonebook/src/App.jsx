import { useState, useEffect } from 'react'
import axios from "axios"

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ persons }) => (
  persons.map(person => <Person key={person.id} person={person}/>)
)

const Filter = ({ filterStr, onChange }) => {
  return (
    <>
      <label>filter shown with </label>
      <input value={filterStr} onChange={onChange}/>
    </>
  )
  
}

const PersonForm = ({
    onSubmit, name, handleChangeName, number, handleChangeNumber
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={handleChangeName} value={name}/>
        </div>
        <div>
          number: <input onChange={handleChangeNumber} value={number}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filterStr, setFilterStr] = useState("")

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/persons")
      .then(response => {
        const persons = response.data
        setPersons(persons)
      })  
  }, [])

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
      <Filter filterStr={filterStr} onChange={handleChangeFilter}/>
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        handleChangeName={(event) => setNewName(event.target.value)}
        number={newNumber}
        handleChangeNumber={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App