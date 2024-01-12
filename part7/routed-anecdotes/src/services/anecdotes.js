import axios from 'axios'

const baseUrl = 'http://127.0.0.1:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

export const deleteAnecdote = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export const updateAnecdote = async (anecdoteToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${anecdoteToUpdate.id}`,
    anecdoteToUpdate
  )
  return response.data
}

export default {
  getAll,
  createAnecdote,
  deleteAnecdote,
  updateAnecdote
}
