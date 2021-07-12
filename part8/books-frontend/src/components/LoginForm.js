import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import Notification from './Notification'

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.message)
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    })
    const [error, setError] = useState(null)

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('books-user-token', token)
        }
    }, [result.data]) //eslint-disable-line

    const submit = (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }

    return (
        <div>
            <Notification errorMessage={error}/>
            <form onSubmit={submit}>
                <div>
                    Username
                        <input value={username} onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div>
                    Password
                        <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm