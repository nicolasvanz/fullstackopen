import axios from "axios"

const baseUrl = "http://127.0.0.1:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const vote = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default {
  getAll,
  createAnecdote,
  vote
}