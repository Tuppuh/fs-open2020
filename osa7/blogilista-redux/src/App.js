import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  // const [user, setUser] = useState(null)
  // const [ statusMessage, setStatusMessage] = useState(null)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  // const blogFormRef = React.createRef()
  // const loginFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  /*
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setStatusMessage({ status: 'success', message: `A blog ${returnedBlog.title} by ${returnedBlog.author} added` })
      })
  }
  */

  /*
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
  */
  /*
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
  */
  /*
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
  */
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
      <Notification />
      <Togglable buttonLabel='login' name='login'>
        <LoginForm/>
      </Togglable>
      {user !== null && <User />}
      <Togglable buttonLabel='new blog' name='new_blog'>
        <BlogForm />
      </Togglable>
      {user !== null && <BlogList />}
    </div>
  )

}

export default App