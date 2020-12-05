import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const blogid = useParams().id
  if (blogid){
    const blog = blogs.find(blog => blog.id === blogid)
    if (!blog){
      return null
    }
    return(
      <Blog blog={blog} showDetailsDefault={true}/>
    )
  }

  return(
    <div className='bloglist'>
      <Togglable buttonLabel='new blog' name='new_blog'>
        <BlogForm />
      </Togglable>
      <ul>
        {blogs
          .map(blog => <Blog key={blog.id} blog={blog}/>)}
      </ul>
    </div>
  )
}

export default BlogList