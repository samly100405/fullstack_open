import { useState } from "react"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = (good, neutral, bad) => (good - bad)/(good + neutral + bad)
  const positive = (good, neutral, bad) => good/(good + neutral + bad)

  return (
    <div className="app">
      <h1>give feedback</h1>

      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      { good + neutral + bad > 0 && <p>average {average(good, neutral, bad)}</p> }
      { good + neutral + bad > 0 && <p>positive {positive(good, neutral, bad)}%</p> }
    </div>
  )
}
export default App