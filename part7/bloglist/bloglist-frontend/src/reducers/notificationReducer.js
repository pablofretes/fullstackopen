const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFICATION_GREEN':
    return action.data
  case 'NOTIFICATION_RED':
    return action.data
  case 'NOTIFICATION_DELETE':
    return null
  default: return state
  }
}

let timeout

export const notificationGreen = (message, seconds) => {
  return async dispatch => {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      dispatch({
        type:'NOTIFICATION_DELETE'
      })
    }, (seconds * 1000))

    dispatch({
      type: 'NOTIFICATION_GREEN',
      data: {
        message,
        type: 'success'
      }
    })
  }
}

export const notificationRed = (message, seconds) => {
  return async dispatch => {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      dispatch({
        type:'NOTIFICATION_DELETE'
      })
    }, (seconds * 1000))

    dispatch({
      type: 'NOTIFICATION_RED',
      data:{
        message,
        type: 'error'
      }
    })
  }
}

export default notificationReducer