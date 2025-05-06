import axios from 'axios'
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

export const getAll = () => {
    return axios.get(`${baseURL}/all`)
}

export const getByName = (name) => {
    return axios.get(`${baseURL}/name/${name}`)
}