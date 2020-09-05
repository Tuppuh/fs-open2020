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

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good*1 + bad*(-1)) / all
  const positive = good / all
  return (
    <div>
      <h1>
        Give feedback
      </h1>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      <h1>
        Statistics
      </h1>
      <div> good: {good} </div>
      <div> neutral: {neutral} </div>
      <div> bad: {bad} </div>
      <div> all: {all} </div>
      <div> average: {average} </div>
      <div> bad: {positive} % </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)