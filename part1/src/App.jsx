import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(
        (res) => {
          setPersons(res.data)
        }
      )

  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((elem) => elem.name === newName)) {
      return alert(`${newName} already exists`)
    }

    const newPerson = { name: newName, number: newNumber }

    axios.post('http://localhost:3001/persons', newPerson)
      .then(
        (res) => {
          console.log(res);
          setPersons([...persons, res.data])
          setNewName('')
          setNewNumber('')
        }
      )
      .catch(
        (err) => {
          console.error(err);
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
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

const Persons = ({ persons, filter }) => {
  return <>
    {
      persons
        .filter(
          (elem) => elem.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(
          (elem) => <Person name={elem.name} number={elem.number} key={elem.name} />
        )
    }
  </>
}

const Person = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
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