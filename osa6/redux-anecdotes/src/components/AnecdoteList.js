import React from 'react'
import { connect } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {
  // const filter = useSelector(state => state.filter)
  // const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => 
  // anecdote.content.toLowerCase().includes(filter.toLowerCase())))
  const anecdotes = props.anecdotes
  // const dispatch = useDispatch()

  const vote = async (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    props.voteAnecdote(anecdote)
    showNotification(`You voted '${anecdote.content}'`)
  }

  const showNotification = (notification) => {
    props.setNotification(notification, 5000)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter/>
      <ul>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </ul>
    </>
  )
}

const mapStateToProps = (state) => {
  return{
    anecdotes: state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
