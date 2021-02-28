const initialState = {
    'login': true,
    'new_blog': false
}

const visibilityReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type){
        case 'SET_VISIBILITY':
            {
                const component = action.data.component
                const visibility = action.data.visibility
                return {
                    ...state,
                    [component]: visibility
                }
            }
        case 'TOGGLE_VISIBILITY':
            {
                const component = action.data
                const visibility = !state[component]
                return {
                    ...state,
                    [component]: visibility
                }
            }        
        default:
            return state
    }
}

export const setVisible = (component) => {
    return async dispatch => {
        dispatch({
            type: 'SET_VISIBILITY',
            data: {component: component, visibility: true}
        })
    }
}

export const setHidden = (component) => {
    return async dispatch => {
        dispatch({
            type: 'SET_VISIBILITY',
            data: {component: component, visibility: false}
        })
    }
}

export const toggleVisibility = (component) => {
    return async dispatch => {
        dispatch({
            type: 'TOGGLE_VISIBILITY',
            data: component
        })
    }
}

export default visibilityReducer
