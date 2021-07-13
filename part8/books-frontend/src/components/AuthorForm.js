import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'
import Notification from './Notification'
import Select from 'react-select'

const AuthorForm = () => {
    const [ changeBorn, result ] = useMutation(EDIT_BORN, {
        refetchQueries: [ { query: ALL_AUTHORS }],
        onError: (error) => {
            setError(error.message)
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    })
    const authorsResult = useQuery(ALL_AUTHORS)
    const [born, setBorn] = useState('')
    const [error, setError] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)

    const submit = async (event) => {
        event.preventDefault()

        await changeBorn({ variables: { name: selectedOption.value, setBornTo: parseInt(born) } })
        setBorn('')
    }

    const options = authorsResult.data.allAuthors

    let optionsArray = options.reduce((array, author) => {
        let value = {value: author.name, label: author.name}
        array.push(value)
        return array
    }, [])

    return (
        <div>
            <Notification errorMessage={error} />
            <h2>Change Author's Year of Birth</h2>
            <form onSubmit={submit}>
                <div>
                    Name
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={optionsArray}
                    />
                </div>
                <div>
                    Year
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>Change</button>
            </form>
        </div>
    )
}

export default AuthorForm