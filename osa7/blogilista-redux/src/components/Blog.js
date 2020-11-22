import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, showDetailsDefault=false }) => {
  const [showDetails, setShowDetails] = useState(showDetailsDefault)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleBlogDelete = () => {
    dispatch(removeBlog(blog.id))
  }

  if (!showDetails) {
    return (
      <div style={blogStyle} className='blog' id={blog.title}>
        {blog.title} {blog.author}
        <button onClick={() => {setShowDetails(true)}}>view</button>
      </div>
    )
  }
  return (
    <div style={blogStyle} className='blog' id={blog.title}>
      {blog.title} {blog.author}
      <button onClick={() => {setShowDetails(false)}}>hide</button>
      <div/>
      {blog.url}
      <div className='likeCount'>
      Likes {blog.likes}
      </div>
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
  blog: PropTypes.any.isRequired
}

export default Blog
