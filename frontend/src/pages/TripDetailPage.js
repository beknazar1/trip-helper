import React from 'react'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import LocationMap from '../components/LocationMap'

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
  fixedHeight: {
    height: 600,
  },
}))

const TripDetailPage = () => {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Paper className={fixedHeightPaper}>
                <LocationMap height="100vh" location={"Chicago, IL"}/>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Paper className={fixedHeightPaper}>
                <LocationMap location={"Washington, DC"}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/*<Orders/>*/}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default TripDetailPage