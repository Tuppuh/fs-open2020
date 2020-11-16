import React from 'react'

const User = ({ user, setUser }) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return(
    <div>
        Logged in as {user.name}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default User
