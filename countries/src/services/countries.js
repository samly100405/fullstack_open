import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return axios
        .get(`${baseURL}/all`)
        .then((res) => {
            return res.data
        })
}

export default { getAll }