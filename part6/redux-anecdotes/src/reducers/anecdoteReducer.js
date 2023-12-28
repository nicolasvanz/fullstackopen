import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = createSlice({
  name : 'anecdotes',
  initialState: anecdotesAtStart.map(anecdote => asObject(anecdote)),
  reducers: {
    createAnecdote(state, action) {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0,
      })
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const votedAnecdoteContent = state.find(anecdote => anecdote.id === id).content
      return state.map(
        anecdote => anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    }
  }
})

export default anecdoteReducer.reducer
export const { createAnecdote, voteAnecdote } = anecdoteReducer.actions