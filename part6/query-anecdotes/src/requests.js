import axios from "axios"

const baseUrl = "http://127.0.0.1:3001/anecdotes"

export const getAll = () => axios.get(baseUrl).then(res => res.data)