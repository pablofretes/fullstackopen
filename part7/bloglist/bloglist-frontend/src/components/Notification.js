import React from 'react'
import { Alert } from '@material-ui/lab'

const Notification = ({ notification }) => {
  if(!notification){
    return null
  }

  return (
    <div>
      {notification.type === 'success' ? (
        <Alert severity='success'>
          {notification.message}
        </Alert>
      ) : (
        <Alert severity='error'>
          {notification.message}
        </Alert>
      )
      }
    </div>
  )
}

export default Notification