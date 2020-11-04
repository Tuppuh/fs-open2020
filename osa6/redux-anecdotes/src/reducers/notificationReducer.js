const initialNotification = {
    content: 'Greetings'
}

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

export const setNotification = (notification) => {
    return{
        type: 'SET_NOTIFICATION',
        data: {content: notification}
    }
}

export const removeNotification = () => {
    return {type: 'REMOVE_NOTIFICATION'}
}

export default notificationReducer