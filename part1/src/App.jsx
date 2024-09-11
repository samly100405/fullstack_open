const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div className="content">
      {
        parts.map(
          (elem, index) => <Part name={elem.name} exercises={elem.exercises} key={index} />
        )
      }
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({ parts }) => {
  return (
    <p>Number of execises {parts.reduce((elem)=>elem, 0)}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/> 
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App