import { useState } from 'react'

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
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((elem) => elem.name === newName)) {
      return alert(`${newName} already exists`)
    }

    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm 
        handleSubmit={addPerson} 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}/>
        
      <h2>Filter</h2>
      <FilterInput value={filter} setValue={setFilter} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App