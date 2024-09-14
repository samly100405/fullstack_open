import { useState, useEffect } from 'react'

import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import FilterInput from './components/FilterInput.jsx'

import personService from './services/persons.js'

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

    let newPerson = { name: newName, number: newNumber }

    const idx = persons.findIndex((elem) => elem.name === newName)

    if (idx != -1) {
      if (window.confirm(`${newName} already exists. replace number?`)) {
        personService.updatePerson(persons[idx].id, newPerson)
        setPersons(persons.map((elem, index) => index == idx ? newPerson : elem))
      }
    }
    else {
      personService.create(newPerson)
        .then(
          (data) => {
            console.log(data)
            setPersons([...persons, data])
          }
        )
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    personService.deletePerson(id)
      .then(
        (res) => setPersons(persons.filter(elem => elem.id !== res.id))
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

export default App