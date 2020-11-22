import blogService from '../services/blogs'
import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from './notificationReducer'
import { setHidden, setVisible } from './visibilityReducer'

const initialState = {
    logged_in: null,
    users: []
}

const userReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch(action.type){
        case 'LOGIN_USER':
            return {logged_in: action.data, users: state.users}
        case 'LOGOUT_USER':
            return {logged_in: null, users: state.users}
        case 'INITIALIZE_USERS':
            return action.data
        default:
            return state
    }
}

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
                type: 'LOGIN_USER',
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
            type: 'LOGOUT_USER'
        })
        dispatch(setVisible('login'))
    }
}

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        let user = null
        if (loggedUserJSON) {
            user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setHidden('login'))
        }
        const users = await userService.getAll()
        dispatch({
            type: 'INITIALIZE_USERS',
            data: {logged_in: user, users: users}
        })
    }
}

export default userReducer
