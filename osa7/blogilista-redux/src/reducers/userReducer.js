import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import { setHidden, setVisible } from './visibilityReducer'

const initialState = null

const userReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch(action.type){
        case 'SET_USER':
            return action.data
        case 'REMOVE_USER':
            return null
        case 'INITIALIZE_USER':
            blogService.setToken(action.data.token)
            return action.data
        default:
            return state
    }
}

/*
export const setUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            data: user
        })
    }
}
*/

export const loginUser = (username, password) => {
    return async dispatch => {
        try{
            const newUser = await loginService.login({
                username, password
            })
            dispatch(setHidden('login'))
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(newUser)
            )
            blogService.setToken(newUser.token)
            dispatch({
                type: 'SET_USER',
                data: newUser
            })
        }
        catch (exception) {
            console.log('wrong credentials')
            dispatch(setNotification('Wrong credentials', 'error', 5000))
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch({
            type: 'REMOVE_USER'
        })
        dispatch(setVisible('login'))
    }
}

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch({
                type: 'INITIALIZE_USER',
                data: user
            })
            dispatch(setHidden('login'))
        }
    }
}

export default userReducer
