import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link'
import {Link as RouterLink} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
}))

export default function SimpleBreadcrumbs({trip, tripId, action}) {
  const classes = useStyles()

  return (
    <Container maxWidth={'sm'} className={classes.root}>
      <Paper className={classes.paper}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/">
            Home
          </Link>
          <Link component={RouterLink} color="inherit" to="/trips/">
            Trips
          </Link>
          {
            trip && !tripId &&
            <Typography color="textPrimary">{trip}</Typography>
          }
          {
            trip && tripId &&
            <Link component={RouterLink} color="inherit" to={`/trips/${tripId}`}>
              {trip}
            </Link>
          }
          {
            action &&
            <Typography color="textPrimary">{action}</Typography>
          }
        </Breadcrumbs>
      </Paper>
    </Container>

  );
}