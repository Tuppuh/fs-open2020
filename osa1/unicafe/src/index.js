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
      <div>
        good: {good}
      </div>
      <div>
        neutral: {neutral}
      </div>
      <div>
        bad: {bad}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)