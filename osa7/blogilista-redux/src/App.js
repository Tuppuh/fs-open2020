import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import UserList from './components/UserList'
import DetailedUser from './components/DetailedUser'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <Container>
      <Navigation />
      <Notification />
      <h2>Blogs</h2>
      <Switch>
        <Route path='/users/:id'>
          <DetailedUser/>
        </Route>
        <Route path='/users'>
          <UserList/>
        </Route>
        <Route path='/blogs/:id'>
          <BlogList/>
        </Route>
        <Route path='/blogs'>
          <BlogList/>
        </Route>
        <Route path='/login'>
          <LoginForm/>
        </Route>
      </Switch>
    </Container>
  )

}

export default App