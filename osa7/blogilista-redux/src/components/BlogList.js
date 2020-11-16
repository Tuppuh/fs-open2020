import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, updateBlog, user, deleteBlog }) => {

  return(
    <div className='bloglist'>
      <ul>
        {blogs
          .sort((a, b) => {return b.likes - a.likes})
          .map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user}
            deleteBlog={deleteBlog}/>)}
      </ul>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.any.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList