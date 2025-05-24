import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const response = await axios.post(baseUrl, asObject(content))
    return response.data
}

const updateOne = async (id, body) => {
    const response = await axios.put(`${baseUrl}/${id}`, body)
    return response.data
}

export default {
    getAll, createNew, updateOne
}