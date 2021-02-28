import { TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'


const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

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
    dispatch(createBlog(blogObject))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <form onSubmit={addBlog}>
      <div>
        <TextField label="Title" className="titleinput" onChange={handleTitleChange}/>
      </div>
      <div>
        <TextField label="Author" className="authorinput" onChange={handleAuthorChange}/>
      </div>
      <div>
        <TextField label="Url" className="urlinput" onChange={handleUrlChange}/>
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          save
        </Button>
      </div>
    </form>
  )
  /*
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
  */
}

export default BlogForm