import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import TripList from './components/TripList'
import TripCreateEdit from './components/TripCreate'
import TripDetailPage from './pages/TripDetailPage'
import HomePage from './pages/HomePage'

const AuthenticatedApp = () => {
  return (
  <Router>
    <Switch>
      <Route exact path="/trips/new">
        <TripCreateEdit/>
      </Route>
      <Route path="/trips/:tripId/edit">
        <TripCreateEdit/>
      </Route>
      <Route path="/trips/:tripId">
        <TripDetailPage/>
      </Route>
      <Route path="/trips">
        <TripList/>
      </Route>
      <Route exact path="/">
        <HomePage loggedIn={true}/>
      </Route>
    </Switch>
  </Router>
  )
}

export default AuthenticatedApp