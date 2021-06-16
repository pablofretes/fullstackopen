import axios from 'axios'

const url = '/api/persons'

const getPersons = () => {
    return axios.get(url)
}

const postPersons = newObject => {
    return axios.post(url, newObject)
}

const deletePersons = (id, newObject) => {
    const deleteUrl = `${url}/${id}`

    return axios.delete(deleteUrl, newObject)
}

const changeNumbers = (id, newObject) => {
    const changeUrl = `${url}/${id}`

    return axios.put(changeUrl, newObject)
}

export default { getPersons, postPersons, deletePersons, changeNumbers }