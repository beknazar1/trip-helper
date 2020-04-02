import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LocationMap from '../components/LocationMap'
import {useParams} from 'react-router-dom'
import {tripDetail} from '../api'
import SimpleBreadcrumbs from '../components/Breadcrumbs'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}))

const TripDetailPage = () => {
  const classes = useStyles()
  const {tripId} = useParams()
  // const [data, setData] = useState(null)
  const [origin, setOrigin] = useState([])
  const [destination, setDestination] = useState([])

  useEffect(() => {
    tripDetail(tripId)
      .then(res => res.data)
      .then(res => {
        // setData(res)
        serialize(res)
      })
  }, [tripId])

  const serialize = (data) => {
    const tempOrigin = {}
    const tempDestination = {}

    for (let entry in data) {
      if (data.hasOwnProperty(entry)) {
        if (entry.startsWith('origin')) {
          tempOrigin[entry.substr(7)] = data[entry]
        } else if (entry.startsWith('destination')) {
          tempDestination[entry.substr(12)] = data[entry]
        } else {
          tempOrigin[entry] = data[entry]
          tempDestination[entry] = data[entry]
        }
      }
    }

    setOrigin(tempOrigin)
    setDestination(tempDestination)
  }

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <SimpleBreadcrumbs trip={origin.name || 'This Trip'}/>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <LocationMap
                direction="Origin: "
                location={origin.city + ', ' + origin.state}
                data={origin}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LocationMap
                direction="Destination: "
                location={destination.city + ', ' + destination.state}
                data={destination}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default TripDetailPage