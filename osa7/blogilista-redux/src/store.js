import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import visibilityReducer from './reducers/visibilityReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    visibility: visibilityReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store
