import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
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

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((elem) => elem.name === newName)) {
      return alert(`${newName} already exists`)
    }

    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
      <h2>Numbers</h2>
      {
        persons.map(
          (elem) => <Person name={elem.name} number={elem.number} key={elem.name}/>
        )
      }
    </div>
  )
}

export default App