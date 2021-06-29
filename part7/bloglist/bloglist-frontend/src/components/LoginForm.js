import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { existingLogin, newLogin } from '../reducers/loginReducer'
import { notificationGreen } from '../reducers/notificationReducer'
import { TextField, Button } from '@material-ui/core'
import '../App.css'

const LoginForm = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(existingLogin())
  })

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    event.target.username.value = ''
    const password = event.target.password.value
    event.target.password.value = ''

    dispatch(newLogin(username, password))
    dispatch(notificationGreen(`Welcome ${username}`), 5)
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          id='username-input'
          data-cy='username'
          label='username'
          type="text"
          name="username"
        >
        </TextField>
        <TextField
          label='password'
          id='password-input'
          data-cy='password'
          type="password"
          name="password"
        >
        </TextField>
      </div>
      <Button variant='contained' color='primary' id='login-button' data-cy='login-button' type="submit">Log-in</Button>
    </form>
  )
}

export default LoginForm