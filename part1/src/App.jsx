import { useState, useEffect } from 'react'

import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import FilterInput from './components/FilterInput.jsx'
import Notification from './components/Notification.jsx'

import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notif, setNotif] = useState({ status: 'success', message: '' })

  const updatePersons = () => {
    personService.getAll()
      .then(
        (persons) => {
          setPersons(persons)
        }
      )
  }

  useEffect(updatePersons, [])

  const addPerson = (event) => {
    event.preventDefault()

    let newPerson = { name: newName, number: newNumber }

    const idx = persons.findIndex((elem) => elem.name === newName)

    if (idx != -1) {
      if (window.confirm(`${newName} already exists. replace number?`)) {
        personService.updatePerson(persons[idx].id, newPerson)
          .then(
            (res) => {
              setNotif({ status: 'success', message: `${res.name} has been successfully updated.` })
              setTimeout(() => {
                setNotif({ status: 'none', message: '' })
              }, 5000)
            }
          )
        setPersons(persons.map((elem, index) => index == idx ? newPerson : elem))
      }
    }
    else {
      personService.create(newPerson)
        .then(
          (res) => {
            setNotif({ status: 'success', message: `${res.name} has been successfully created.` })
            setTimeout(() => {
              setNotif({ status: 'none', message: '' })
            }, 5000)
            setPersons([...persons, res])
          }
        )
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    personService.deletePerson(id)
      .then(
        (res) => {
          setPersons(persons.filter(elem => elem.id !== res.id))
          setNotif({ status: 'success', message: `${res.name} has been successfully deleted.` })
          setTimeout(() => {
            setNotif({ status: 'none', message: '' })
          }, 5000)
        }
      )
      .catch(
        (err) => {
          if (err.status == 404) {
            const deletedPerson = persons.find(elem => elem.id === id)

            updatePersons()

            setNotif({ status: 'error', message: `${deletedPerson.name} has already been deleted.` })
            setTimeout(() => {
              setNotif({ status: 'none', message: '' })
            }, 5000)
          }
        }
      )
  }

  return (
    <div>
      <Notification type={notif.status} text={notif.message} />
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