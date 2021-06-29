import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationGreen, notificationRed } from './notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return action.data
  case 'LOGGED_IN':
    return action.data
  case 'LOGOUT':
    return null
  default: return state
  }
}

export const existingLogin = () => {

  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if(loggedUserJSON){
    const userLog = JSON.parse(loggedUserJSON)
    blogService.setToken(userLog.token)
    return {
      type: 'LOGGED_IN',
      data: userLog
    }
  }

  return {
    type: 'LOGOUT'
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  return {
    type: 'LOGOUT'
  }
}

export const newLogin = (username, password) => {
  return async dispatch => {
    try {
      const userLog = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userLog))
      blogService.setToken(userLog.token)
      dispatch({
        type: 'LOG_IN',
        data: userLog
      })
      dispatch(notificationGreen(`Welcome ${userLog.username}`, 5))
    }
    catch (err) {
      dispatch(notificationRed(err))
      dispatch(notificationRed('Incorrect Username or Password', 5))
      window.localStorage.clear()
    }
  }
}

export default loginReducer