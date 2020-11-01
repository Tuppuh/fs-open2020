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
      loginFormRef.current.toggleVisibility()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setStatusMessage({ status: 'success', message: `A blog ${returnedBlog.title} by ${returnedBlog.author} added` })
      })
  }

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject.id, blogObject)
      .then(returnedBlog => {
        setBlogs(
          blogs.map(blog => {
            return blog.id === returnedBlog.id ? returnedBlog : blog
          })
        )
      })
  }

  const deleteBlog = (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)){
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setStatusMessage({ status: 'success', message: `Blog ${blogToRemove.title} by ${blogToRemove.author} removed` })
        })
    }
  }

  const login = async (username, password) => {
    try{
      const newUser = await loginService.login({
        username, password
      })
      loginFormRef.current.toggleVisibility()
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(newUser)
      )
      setUser(newUser)
      blogService.setToken(newUser.token)
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
      <h2>Blogs</h2>
      <Notification notification={statusMessage} setNotification={setStatusMessage}/>
      <Togglable buttonLabel='login' ref={loginFormRef} default={true}>
        <LoginForm login={login}/>
      </Togglable>
      {user !== null && <User user={user} setUser={setUser}/>}
      <Togglable buttonLabel='new blog' ref={blogFormRef} default={false}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {user !== null && <BlogList blogs={blogs} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog}/>}
    </div>
  )

}

export default App