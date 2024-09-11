import { useState } from "react"

const Statistics = ({ good, neutral, bad }) => {
  const average = (good, neutral, bad) => (good - bad)/(good + neutral + bad)
  const positive = (good, neutral, bad) => 100*good/(good + neutral + bad)

  return (
    <div className="statistics">
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {average(good, neutral, bad)}</p>
      <p>positive {positive(good, neutral, bad)}%</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className="app">
      <h1>give feedback</h1>

      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>

      <h1>statistics</h1>
      { good + neutral + bad > 0 ? 
        <Statistics good={good} neutral={neutral} bad={bad} /> 
        : <p>No feedback given</p>
      }
    </div>
  )
}
export default App