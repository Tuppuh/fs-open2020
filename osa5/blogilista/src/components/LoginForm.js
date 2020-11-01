import React, { useState } from 'react'

const LoginForm = ({ login }) => {

  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const handleLogin = async (event) => {
    event.preventDefault()
    await login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </>
  )
}

export default LoginForm