import React, { useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({blogs, setBlogs}) => {
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

    
    const blogForm = () => (
        <form onSubmit={addBlog}>
        <div>Title:
        <input
            value={title}
            onChange={handleTitleChange}/>
        </div>
        <div>Author:
        <input
            value={author}
            onChange={handleAuthorChange}/>
        </div>
        <div> Url: 
        <input
            value={url}
            onChange={handleUrlChange}/>
        </div>
        <button type="submit">save</button>
        </form>  
    )

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }
        blogService.create(blogObject)
        .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
        })
    }

    return(
        <div>
            {blogForm()}
            <ul>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </ul>
        </div>
    )
}

export default BlogList