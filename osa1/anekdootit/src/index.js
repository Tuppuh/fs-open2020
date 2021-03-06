import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MostVoted = (props) => {
  const {anecdote, votecount} = props
  if (votecount === 0){
    return(
    <>
      <h1>
        Anecdote with the most votes
      </h1>
      No anecdote has received votes yet
    </>
    )
  }
  return(
  <>
    <h1>
      Anecdote with the most votes
    </h1>
    <div>
      {anecdote}
    </div>
    <div>
      has {votecount} votes
    </div>
  </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const maxVotes = Math.max(...votes)
  const maxVotesIndex = votes.indexOf(maxVotes)
  const selectRandom = () => {
    const idx = Math.floor(Math.random() * 6);
    setSelected(idx)
  }
  const vote = () => {
    const copy = [...votes]
    // kasvatetaan taulukon paikan idx arvoa yhdellä
    copy[selected] += 1
    setVotes(copy)
  }  

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <button onClick={selectRandom}>
        next anecdote
      </button>
      <button onClick={vote}>
        vote
      </button>
      <MostVoted anecdote={props.anecdotes[maxVotesIndex]}
        votecount={maxVotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)