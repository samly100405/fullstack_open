const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Total = ({ total }) => {
  return (
    <p>Number of execises {total}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course}/> 
      <Content part={part1.name} exercises={part1.exercises} />
      <Content part={part2.name} exercises={part2.exercises} />
      <Content part={part3.name} exercises={part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App