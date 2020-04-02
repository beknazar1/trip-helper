import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link as RouterLink} from 'react-router-dom'
import {Button} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const HomePage = ({loggedIn, form}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.mainFeaturedPost}>
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Trip Helper App
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Save your upcoming trips and check weather for that day
            </Typography>
            <Typography variant="h6" color="inherit" href="#">
              Coming soon: COVID-19 tracker
            </Typography>
          </div>
        </Grid>
        {
          loggedIn &&
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Button component={RouterLink} to="/trips" color="secondary" variant={'contained'} size={'large'}>
                VIEW TRIPS
              </Button>
            </div>
          </Grid>
        }
        {
          form &&
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              {form}
            </div>
          </Grid>
        }
      </Grid>
    </Paper>
  );
}

export default HomePage