import React, {useEffect, useState} from 'react'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Nav from './components/Nav'
import AuthenticatedApp from './AuthenticatedApp'
import CssBaseline from '@material-ui/core/CssBaseline'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import HomePage from './pages/HomePage'

function App() {
  const [displayedForm, setDisplayedForm] = useState('')
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (loggedIn) {
      fetch('/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.detail)
            handleLogout()
          else
            setUsername(json.username)
        })
    }
  }, [loggedIn])

  const handleLogin = (e, data) => {
    e.preventDefault()
    fetch('/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token)
        setDisplayedForm('')
        setUsername(json.user.username)
      })
      .then(res => setLoggedIn(true))
  }

  const handleSignup = (e, data) => {
    e.preventDefault()
    fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token)
        setDisplayedForm('')
        setUsername(json.username)
      })
      .then(res => setLoggedIn(true))
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
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div>
        <CssBaseline/>
        <Nav {...{displayForm, loggedIn, handleLogout, username}} />
        {loggedIn ? <AuthenticatedApp  {...{username}}/> : <HomePage form={FORM[displayedForm]}/>}
      </div>
    </MuiPickersUtilsProvider>

  )
}

export default App
