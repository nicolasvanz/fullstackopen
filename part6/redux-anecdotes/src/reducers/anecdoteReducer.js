import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from "../services/anecdotes"

const anecdoteReducer = createSlice({
  name : 'anecdotes',
  initialState: [],
  reducers: {
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

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const currState = getState().anecdotes
    const anecdoteToVote = currState.find(
      anecdote => anecdote.id === id
    )
    const newAnecdoteObject = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    const savedAnecdote = await anecdoteService.vote(id, newAnecdoteObject)
    const nextState = currState.map(
      anecdote => anecdote.id === id
        ? savedAnecdote
        : anecdote
    )

    dispatch(setAnecdotes(nextState))
  }
}

export const {setAnecdotes, appendAnecdote } = anecdoteReducer.actions