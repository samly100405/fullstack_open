import { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons.js'
import persons from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(
        (persons) => {
          setPersons(persons)
        }
      )

  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((elem) => elem.name === newName)) {
      return alert(`${newName} already exists`)
    }

    const newPerson = { name: newName, number: newNumber }

    personService.create(newPerson)
      .then(
        (data) => {
          console.log(data)
          setPersons([...persons, data])
        }
      )
      .then(
        (res) => {
          setNewName('')
          setNewNumber('')
        }
      )
  }

  const handleDelete = (id) => {
    personService.deletePerson(id)
      .then(
        (res) => {
          setPersons(
            persons
              .filter(
                (elem) => elem.id !== res.id
              )
          )
        }
      )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        handleSubmit={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber} />

      <h2>Filter</h2>
      <FilterInput value={filter} setValue={setFilter} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

const Persons = ({ persons, filter, handleDelete }) => {
  return <>
    {
      persons
        .filter(
          (elem) => elem.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(
          (elem) => <Person
            name={elem.name}
            number={elem.number}
            id={elem.id}
            handleDelete={() => handleDelete(elem.id)}
            key={elem.id} />
        )
    }
  </>
}

const Person = ({ name, number, handleDelete }) => {
  return (
    <div className="person">
      <p>{name} {number}</p>
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const FilterInput = ({ value, setValue }) => {
  return (
    <div>
      filter by:
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)} />
    </div>
  )
}

const PersonForm = ({ handleSubmit, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          value={newName}
          onChange={
            (event) => setNewName(event.target.value)
          }
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={
            (event) => setNewNumber(event.target.value)
          }
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default App