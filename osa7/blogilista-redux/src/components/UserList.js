import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

const UserList = () => {
    const users = useSelector(state => state.user.users)

    return(
        <div className='userlist'>
            <h2>Users</h2>
            <ul>
                <label>blogs created</label>
                {users.map(user=> <User key={user.id} user={user}/>)}
            </ul>
        </div>
    )
}

export default UserList
