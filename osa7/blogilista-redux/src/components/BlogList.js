import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
} from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const blogid = useParams().id
  if (blogid){
    const blog = blogs.find(blog => blog.id === blogid)
    if (!blog){
      return null
    }
    return(
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <Blog blog={blog} showDetailsDefault={true}/>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return(
    <div className='bloglist'>
      <Togglable buttonLabel='new blog' name='new_blog'>
        <BlogForm />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList