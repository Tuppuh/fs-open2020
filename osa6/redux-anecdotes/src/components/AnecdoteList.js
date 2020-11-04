import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())))
  const dispatch = useDispatch()

  const vote = async (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.update(id, updatedAnecdote)
    dispatch(voteAnecdote(id))
    showNotification(`You voted '${anecdote.content}'`)
  }

  /*
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    showNotification(`Added '${content}'`)
  }
  */

  const showNotification = (notification) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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

export default AnecdoteList
