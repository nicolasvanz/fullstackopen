import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from "../services/anecdotes"

const anecdoteReducer = createSlice({
  name : 'anecdotes',
  initialState: [],
  reducers: {
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
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export default anecdoteReducer.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const savedAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(savedAnecdote))
  }
}

export const {voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteReducer.actions