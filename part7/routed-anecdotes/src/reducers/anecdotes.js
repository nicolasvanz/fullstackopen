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

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const currState = getState().anecdotes
    const anecdoteToVote = currState.find((anecdote) => anecdote.id === id)
    const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    const savedAnecdote = await anecdotesService.updateAnecdote(votedAnecdote)
    const nextState = currState.map((anecdote) =>
      anecdote.id !== id ? anecdote : savedAnecdote
    )
    dispatch(notify('voted on anecdote'))
    dispatch(setAnecdotes(nextState))
  }
}

export const deleteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const currState = getState().anecdotes
    await anecdotesService.deleteAnecdote(id)
    const nextState = currState.filter((anecdote) => anecdote.id !== id)
    dispatch(notify('deleted anecdote'))
    dispatch(setAnecdotes(nextState))
  }
}

export default anecdotesReducer.reducer

export const { appendAnecdote, setAnecdotes } = anecdotesReducer.actions
