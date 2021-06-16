import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id='cancel-button' data-cy='cancel-button' onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggable