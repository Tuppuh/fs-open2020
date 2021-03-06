const initialNotification = {
    content: 'Greetings'
}

let timeoutID = null

const notificationReducer = (state = initialNotification, action) => {
    switch (action.type){
        case 'SET_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {content: notification}
        })
        if (timeoutID !== null){
            clearTimeout(timeoutID)
        } 
        timeoutID = setTimeout(() => {dispatch(removeNotification())}, time)
    }
}

export const removeNotification = () => {
    return {type: 'REMOVE_NOTIFICATION'}
}

export default notificationReducer