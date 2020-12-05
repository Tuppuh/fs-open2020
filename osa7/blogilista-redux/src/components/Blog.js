import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, showDetailsDefault=false }) => {
  const [showDetails, setShowDetails] = useState(showDetailsDefault)
  const user = useSelector(state => state.user.logged_in)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

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

  const handleBlogComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  if (!showDetails) {
    return (
      <div style={blogStyle} className='blog' id={blog.title}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
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
      {user && user.username === blog.user.username &&
        <button onClick={handleBlogDelete}>remove</button>}
      <h3>comments</h3>
      <form onSubmit={handleBlogComment}>
        <div>Comment:
          <input
            className={'commentinput'}
            value={comment}
            onChange={handleCommentChange}/>
        </div>
        <button type="submit">save</button>
      </form>
      <ul>
        {blog.comments
          .map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.any.isRequired
}

export default Blog
