import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import DetailedUser from './components/DetailedUser'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.user.logged_in)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Togglable buttonLabel='login' name='login'>
        <LoginForm/>
      </Togglable>
      {user !== null && <LoggedUser />}
      <Togglable buttonLabel='new blog' name='new_blog'>
        <BlogForm />
      </Togglable>
      <Switch>
        <Route path='/users/:id'>
          <DetailedUser/>
        </Route>
        <Route path='/users'>
          <UserList/>
        </Route>
        <Route path='/blogs'>
          <BlogList/>
        </Route>
      </Switch>
    </div>
  )

}

export default App