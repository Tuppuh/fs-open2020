import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import User from './components/User'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [ statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification notification={statusMessage} setNotification={setStatusMessage}/>
      {user === null && <LoginForm setUser={setUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setStatusMessage={setStatusMessage}/>}
      {user !== null && <User user={user} setUser={setUser}/>}
      {user !== null && <BlogList blogs={blogs} setBlogs={setBlogs} setStatusMessage={setStatusMessage}/>}    
    </div>
  )
}

export default App