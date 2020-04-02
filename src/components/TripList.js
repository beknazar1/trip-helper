import React, {useEffect, useState} from 'react'
import {tripList} from '../api'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import {CardActions} from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import {Link} from 'react-router-dom'
import AlertDialog from './AlertDialog'
import SimpleBreadcrumbs from './Breadcrumbs'

const useStyles = makeStyles((theme) => ({
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
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const TripList = () => {
  const classes = useStyles()
  const [trips, setTrips] = useState([])
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    tripList()
      .then(res => {
        if (res.status === 200) {
          setTrips(res.data)
        }
      })
  }, [])

  const handleDelete = (id) => {
    setOpenDialog(trips.find(trip => trip.id === id))
  }

  return (
    <main className={classes.content}>
      <SimpleBreadcrumbs/>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={5} alignItems="flex-end">
          {trips.map(trip =>
            <Grid item key={trip.id} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={trip.name}
                  subheader={trip.scheduled_date}
                  titleTypographyProps={{align: 'center'}}
                  subheaderTypographyProps={{align: 'center'}}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <Typography>
                    From: {trip.origin_city}, {trip.origin_state}
                  </Typography>
                  <Typography>
                    To: {trip.destination_city}, {trip.destination_state}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ButtonGroup size="small" fullWidth color="primary">
                    <Button component={Link} to={`/trips/${trip.id}`}>Open</Button>
                    <Button component={Link} to={`/trips/${trip.id}/edit`}>Edit</Button>
                    <Button onClick={() => handleDelete(trip.id)}>delete</Button>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>,
          )}
        </Grid>
        <Fab component={Link} to="/trips/new/" color="primary" aria-label="add" className={classes.fab}>
          <AddIcon/>
        </Fab>
      </Container>
      <AlertDialog {...{openDialog, setOpenDialog}} />
    </main>
  )
}

export default TripList