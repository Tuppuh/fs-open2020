import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import User from './components/User'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [ statusMessage, setStatusMessage] = useState(null)

  const blogFormRef = React.createRef()
  const loginFormRef = React.createRef()

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setStatusMessage({status: 'success', message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`})
      })
  }

  const login = async (username, password) => {
    try{
      loginFormRef.current.toggleVisibility()
      const newUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(newUser)
      )
      setUser(newUser)
    }
    catch (exception) {
      console.log('wrong credentials')
      setStatusMessage({ status: 'error', message: 'wrong username or password' })
    }
  }

  /*
  return(
    <div>
      <Notification notification={statusMessage} setNotification={setStatusMessage}/>
      <Togglable buttonLabel='login'>
        <div>asd</div>
      </Togglable>
    </div>
  )
  */
  
  return (
    <div>
      <Notification notification={statusMessage} setNotification={setStatusMessage}/>
      <Togglable buttonLabel='login' ref={loginFormRef}>
        <LoginForm login={login}/>
      </Togglable>
      {user !== null && <User user={user} setUser={setUser}/>}
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {user !== null && <BlogList blogs={blogs} setBlogs={setBlogs} setStatusMessage={setStatusMessage}/>}    
    </div>
  )
  
}

export default App