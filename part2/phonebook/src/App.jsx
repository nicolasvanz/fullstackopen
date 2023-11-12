import { useState, useEffect } from 'react'

import personService from "./services/persons"

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }
  const style = {
    color: success ? "green" : "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return(
    <div style={style}>
      {message}
    </div>
  )
}

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
  const [NotificationMessage, setNotificationMessage] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })  
  }, [])

  const notify = (message, success=true) => {
    setNotificationSuccess(success)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const windowMessage = `${newPerson.name} is already added to the phonebook\
, replace the old number with a new one?`
    const messageFailOnUpdate = `Information of ${newPerson.name} has already been \
removed from server`
    const messageSuccessOnUpdate = `Updated ${newPerson.name}'s number`
    const messageSuccessOnCreate = `Added ${newPerson.name}`

    const perssonAlreadyAdded = persons.map(person => person.name).includes(
      newPerson.name
    )
    if (perssonAlreadyAdded) {
      if (!window.confirm(windowMessage))
        return

      const replacedPersonId = persons.find(
        person => person.name === newPerson.name
      ).id
      personService
        .update(
          replacedPersonId,
          newPerson
        )
        .then(updatedPerson => {
          setPersons(persons.map(
            person => person.id === replacedPersonId ? updatedPerson : person
          ))
          notify(messageSuccessOnUpdate)
        })
        .catch(error => {
          notify(messageFailOnUpdate, false)
          setPersons(persons.filter(person => person.id !== replacedPersonId))
        })
    }
    else {
      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          notify(messageSuccessOnCreate)
        })
        .catch(error => {
          notify(`couldn't add ${newPerson.name}`)
        })
    }
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(
      `Delete ${person.name}?`
    )) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          notify(`Couldn't remove ${person.name}`)
        })
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
      <Notification message={NotificationMessage} success={notificationSuccess}/>
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