import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { setHidden } from './visibilityReducer'

const initialState = []

const sortByLikes = (list) => {
    list.sort((a, b) => {return b.likes - a.likes})
    return list
}

const blogReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch(action.type){
        case 'NEW_BLOG':
            return sortByLikes([...state, action.data])
        case 'INIT_BLOGS':
            return sortByLikes(action.data)
        case 'UPDATE_BLOG':
            {
                const id = action.data.id
                return sortByLikes(state.map(blog => 
                    blog.id !== id ? blog : action.data))
            }
        case 'REMOVE_BLOG':
            {
                const id = action.data
                return state.filter(blog => 
                    blog.id !== id)
            }
        default:
            return state
    }
}

export const createBlog = content => {
    return async dispatch => {
        try{
            const newBlog = await blogService.create(content)
            dispatch({
                type: 'NEW_BLOG',
                data: newBlog
            })
            dispatch(setHidden('new_blog'))
            dispatch(setNotification(`A blog ${newBlog.title} by ${newBlog.author} added`, 'success', 5000))
        }
        catch (exception){
            console.log('failed to add blog')
        } 
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        const updatedBlog = {
            ...blog, 
            user: blog.user.id,
            likes: blog.likes + 1}
        const id = updatedBlog.id
        const savedBlog = await blogService.update(id, updatedBlog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: savedBlog
        })
    }
}

export const commentBlog = (id, comment) => {
    return async dispatch => {
        const commentedBlog = await blogService.comment(id, comment)
        dispatch({type: 'UPDATE_BLOG',
                    data: commentedBlog})
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        }) 
    }
}

export const removeBlog = id => {
    return async dispatch => {
        try{
            await blogService.remove(id)
            dispatch({
                type: 'REMOVE_BLOG',
                data: id
            })
        }
        catch (exception) {
            dispatch(setNotification('Failed to remove a blog', 'error', 5000))
        }
    }
}

export default blogReducer
