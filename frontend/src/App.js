import React, {useEffect, useState} from 'react'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Nav from './components/Nav'
import './App.css'
import AuthenticatedApp from './AuthenticatedApp'

function App() {
  const [displayedForm, setDisplayedForm] = useState('')
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (loggedIn) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(json => setUsername(json.username))
    }
  }, [loggedIn])

  const handleLogin = (e, data) => {
    e.preventDefault()
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token)
        setLoggedIn(true)
        setDisplayedForm('')
        setUsername(json.user.username)
      })
  }

  const handleSignup = (e, data) => {
    e.preventDefault()
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token)
        setLoggedIn(true)
        setDisplayedForm('')
        setUsername(json.username)
      })
  }

  const FORM = {
    login: <LoginForm {...{handleLogin}} />,
    signup: <SignupForm {...{handleSignup}} />,
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    setUsername('')
  }

  const displayForm = form => {
    setDisplayedForm(form)
  }

  return (
    <div className="App">
      <Nav {...{displayForm, loggedIn, handleLogout, username}} />
      {FORM[displayedForm]}
      {loggedIn ? <AuthenticatedApp  {...{username}}/> : <p>Please log in</p>}
    </div>
  )
}

export default App
