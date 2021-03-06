import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>Title:
        <input
          className={'titleinput'}
          value={title}
          onChange={handleTitleChange}/>
      </div>
      <div>Author:
        <input
          className={'authorinput'}
          value={author}
          onChange={handleAuthorChange}/>
      </div>
      <div> Url:
        <input
          className={'urlinput'}
          value={url}
          onChange={handleUrlChange}/>
      </div>
      <button type="submit">save</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm