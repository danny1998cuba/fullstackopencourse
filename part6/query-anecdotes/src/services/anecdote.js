import axios from 'axios'
import { asObject } from '../utils/helpers'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data
}

export const createNew = async (content) => {
    const response = await axios.post(baseUrl, asObject(content))
    return response.data
}

export const updateOne = async (id, body) => {
    const response = await axios.put(`${baseUrl}/${id}`, body)
    return response.data
}