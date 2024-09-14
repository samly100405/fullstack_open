const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div className="persons">
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
              key={elem.name} />
          )
      }
    </div>
  )
}

const Person = ({ name, number, handleDelete }) => {
  return (
    <div className="person">
      <p>{name} {number}</p>
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

export default Persons 