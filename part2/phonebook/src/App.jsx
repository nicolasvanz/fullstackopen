import { useState, useEffect } from 'react'
import personService from "./services/persons"

const Person = ({ person, deleteOnClick }) => {
  return (
    <>
      <div>
        <label>{person.name} {person.number}</label>
        <button onClick={deleteOnClick}>delete</button>   
      </div>
    </>
  )
}

const Persons = ({ persons, deleteOnClick }) => (
  persons.map(person =>
    <Person
      key={person.id}
      person={person}
      deleteOnClick={() => deleteOnClick(person.id)}
    />
  )
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
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })  
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (persons.map(person => person.name).includes(newPerson.name))
      alert(`${newName} is already added to the phonebook`)
    else
      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
        })
  }

  const removePerson = (id) => {
    if (window.confirm(
      `Delete ${persons.find(person => person.id === id).name}?`
    )) {
      personService
        .remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }
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
      <Persons persons={shownPersons} deleteOnClick={removePerson}/>
    </div>
  )
}

export default App