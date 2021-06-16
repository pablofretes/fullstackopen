import anecdoteServices from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE': 
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToBeVoted = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteToBeVoted,
        votes: anecdoteToBeVoted.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote) 
    default: return state
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteServices.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}
    
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.postAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  } 
}

export const initAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer