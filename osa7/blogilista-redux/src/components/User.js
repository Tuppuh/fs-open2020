import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const User = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return(
    <div>
        Logged in as {user.name}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default User
