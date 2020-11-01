import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogLike = () => {
    const newLikes = blog.likes + 1
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: newLikes
    }
    updateBlog(updatedBlog)
  }

  const handleBlogDelete = () => {
    deleteBlog(blog.id)
  }

  if (!showDetails) {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author}
        <button onClick={() => {setShowDetails(true)}}>view</button>
      </div>
    )
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => {setShowDetails(false)}}>hide</button>
      <div/>
      {blog.url}
      <div/>
      Likes {blog.likes}
      <button onClick={handleBlogLike}>like</button>
      <div/>
      {blog.user.name}
      <div/>
      {user.username === blog.user.username &&
        <button onClick={handleBlogDelete}>remove</button>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.any.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.any.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
