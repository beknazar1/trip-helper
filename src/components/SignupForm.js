import React, {useState} from 'react'

const SignupForm = ({handleSignup}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form onSubmit={e => handleSignup(e, {username, password})}>
      <h4>Sign Up</h4>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input type="submit"/>
    </form>
  )
}

export default SignupForm
