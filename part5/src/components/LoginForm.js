import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
          username
        <input
          id='username-input'
          data-cy='username'
          type="text"
          value={props.username}
          name="Username"
          onChange={props.handleChangeUsername}
        >
        </input>
          password
        <input
          id='password-input'
          data-cy='password'
          type="password"
          value={props.password}
          name="Password"
          onChange={props.handleChangePassword}
        >
        </input>
      </div>
      <button id='login-button' data-cy='login-button' type="submit">Log-in</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleChangeUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm