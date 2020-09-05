import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  const {text, handleClick} = props
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = (props) => {
  const {text, value, unit} = props
  return(
    <div> {text}: {value} {unit} </div>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  const average = (good*1 + bad*(-1)) / all
  const positive = good / all
  if (all === 0){
    return(
      <>
        <h1>
          Statistics
        </h1>
        <div>
          No feedback given
        </div>
      </>
    )
  }
  return(
  <>
    <h1>
      Statistics
    </h1>
    <StatisticsLine text="good" value={good} />
    <StatisticsLine text="neutral" value={neutral} />
    <StatisticsLine text="bad" value={bad} />
    <StatisticsLine text="all" value={all} />
    <StatisticsLine text="average" value={average} />
    <StatisticsLine text="positive" value={positive} unit={"%"} />
  </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>
        Give feedback
      </h1>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)