import axios from 'axios'
const urlBase = "http://localhost:3001/persons"

export const getPersons = () => {
    return axios.get(urlBase)
}

export const createPerson = (newPerson) => {
    return axios.post(urlBase, newPerson)
}

export const updatePerson = (id, newPerson) => {
    return axios.put(`${urlBase}/${id}`, newPerson)
}

export const deletePerson = (id) => {
    return axios.delete(`${urlBase}/${id}`)
}