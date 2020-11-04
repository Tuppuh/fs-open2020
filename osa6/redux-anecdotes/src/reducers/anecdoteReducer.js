// import anecdoteService from '../services/anecdotes'

const sortByVotes = (list) => {
  list.sort((a, b) => {return b.votes - a.votes})
  return list
}

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'NEW_ANECDOTE':
      return sortByVotes([...state, action.data])
    case 'INIT_ANECDOTES':
      return sortByVotes(action.data)
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return sortByVotes(state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote))
    default:
      return state
  }
}

/*
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}
*/
export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}


export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

/*
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}
*/
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer