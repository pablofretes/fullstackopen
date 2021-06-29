import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import '../App.css'

const Toggable = (props) => {
  const [visibility, setVisibility] = useState(false)

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button id='cancel-button' data-cy='cancel-button' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
}

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggable