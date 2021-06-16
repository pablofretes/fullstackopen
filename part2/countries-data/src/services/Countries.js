import axios from 'axios'

const url = 'https://restcountries.eu/rest/v2/all'

const getCountries = () => {
    return axios.get(url)
}

const getCountry = (name) => {
    const urlByName = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
    return axios.get(urlByName)
}

export default { getCountries, getCountry }