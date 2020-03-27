import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import TripList from './components/TripList'

const AuthenticatedApp = () => {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <TripList/>
      </Route>
    </Switch>
  </Router>
  )
}

export default AuthenticatedApp