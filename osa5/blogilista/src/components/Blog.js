import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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

  if (!showDetails) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} 
        <button onClick={() => {setShowDetails(true)}}>view</button>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => {setShowDetails(false)}}>hide</button>
      <div/>
      {blog.url}
      <div/>
      Likes {blog.likes} 
      <button onClick={handleBlogLike}>like</button>
      <div/>
      {blog.user.name}
    </div>
  )
}

export default Blog
