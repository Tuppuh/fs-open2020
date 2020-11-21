const initialNotification = null

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

export const setNotification = (notification, status, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {content: notification, status: status}
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