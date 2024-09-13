import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
            .get(baseUrl)
            .then(
                (res) => {
                    return res.data
                }
            )
}

const create = (newPerson) => {
    return axios
            .post(baseUrl, newPerson)
            .then(
                (res) => {
                    return res.data
                }
            )
}

const deletePerson = (personID) => {
    return axios
            .delete(`${baseUrl}/${personID}`)
            .then(
                (res) => {
                    console.log(res)
                    return res.data
                }
            )
}

const updatePerson = (personID, newPerson) => {
    return axios
            .put(`${baseUrl}/${personID}`, newPerson)
            .then(
                (res) => res.data
            )
}

export default {
    getAll,
    create,
    deletePerson,
    updatePerson,
}