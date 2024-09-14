import express, { response } from 'express'

const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send(`
        Phonebook has info for ${persons.length} people. <br/>
        ${Date()}`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:personID', (request, response) => {
    const personID = request.params.personID
    const person = persons.find((elem) => elem.id === personID)

    if (!person) {
        return response.status(404).json({error: 'person not found'})
    }

    return response.json(person)
})

app.delete('/api/persons/:personID', (request, response) => {
    const personID = request.params.personID
    const person = persons.findIndex((elem) => elem.id === personID)

    if (person == -1) {
        return response.status(404).json({error: 'person not found'})
    }

    persons.splice(person, 1)
    return response.json(persons)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})