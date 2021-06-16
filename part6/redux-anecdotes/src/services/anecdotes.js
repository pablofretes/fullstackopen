import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postAnecdote = async (content) => {
    const newAnecdote = { content: content, votes: 0 }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const update = async (anecdote) => {
    const response = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

export default { getAll, postAnecdote, update }