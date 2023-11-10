import axios from "axios"

const baseUrl = "http://127.0.0.1:3001/persons"

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    request.then(response => console.log(response))
}

export default {
    create,
    getAll,
    remove
}