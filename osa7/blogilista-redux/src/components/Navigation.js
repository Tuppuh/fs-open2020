import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import {
  Link
} from 'react-router-dom'


const Navigation = () => {
  const user = useSelector(state => state.user.logged_in)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const padding = {
    padding: 5
  }

  return(
    <div>
      <Link style={padding} to='/'>home</Link>
      <Link style={padding} to='/blogs'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {user
        ? <em>{user.name} logged in <button onClick={handleLogout}>Logout</button> </em>
        : <Link style={padding} to={'/login'}> login </Link>}
    </div>
  )
}

export default Navigation
