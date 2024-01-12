import { createSlice } from '@reduxjs/toolkit'

import anecdotesService from '../services/anecdotes'
import { notify } from './notification'

const anecdotesReducer = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = {
      ...anecdote,
      votes: 0
    }
    const savedAnecdote = await anecdotesService.createAnecdote(newAnecdote)
    dispatch(notify('a new anecdote was created'))
    dispatch(appendAnecdote(savedAnecdote))
  }
}

export default anecdotesReducer.reducer

export const { appendAnecdote, setAnecdotes } = anecdotesReducer.actions
