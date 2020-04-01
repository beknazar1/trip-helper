import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import TripList from './components/TripList'
import TripCreateEdit from './components/TripCreate'
import TripDetailPage from './pages/TripDetailPage'

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
      <Route exact path={["/trips", "/"]}>
        <TripList/>
      </Route>
    </Switch>
  </Router>
  )
}

export default AuthenticatedApp