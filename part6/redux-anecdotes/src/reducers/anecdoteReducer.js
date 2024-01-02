import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = createSlice({
  name : 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      return state.map(
        anecdote => anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteReducer.reducer
export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteReducer.actions