import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, updateBlog}) => {

    return(
        <div>
            <ul>
                {blogs
                    .sort((a, b) => {return b.likes - a.likes})
                    .map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />)}
            </ul>
        </div>
    )
}

export default BlogList