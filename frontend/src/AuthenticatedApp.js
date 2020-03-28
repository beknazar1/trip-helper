import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import TripList from './components/TripList'
import TripCreateEdit from './components/TripCreate'

const AuthenticatedApp = () => {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <TripList/>
      </Route>
      <Route exact path="/trips/new">
        <TripCreateEdit/>
      </Route>
      <Route path="/trips/:tripId/edit">
        <TripCreateEdit/>
      </Route>
      <Route path="/trips/:tripId">
        <p>Your new trip</p>
      </Route>
    </Switch>
  </Router>
  )
}

export default AuthenticatedApp