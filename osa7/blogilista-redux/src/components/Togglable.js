import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleVisibility } from '../reducers/visibilityReducer'

const Togglable = (props) => {
  const visible = useSelector (state => state.visibility[props.name])
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggle = () => {
    dispatch(toggleVisibility(props.name))
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggle}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'

export default Togglable
