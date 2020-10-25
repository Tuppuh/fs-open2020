import React from 'react'
import loginService from '../services/login'

const LoginForm = ({setUser, username, setUsername, password, setPassword, setStatusMessage}) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
          const user = await loginService.login({
            username, password
          })
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
            ) 
          setUser(user)
          setUsername('')
          setPassword('')
        }
        catch(exception){
          console.log('wrong credentials')
          setStatusMessage({status: 'error', message: 'wrong username or password'})
        }
    }

    return(
        <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
            username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
        </form>
        </>
    )
}

export default LoginForm