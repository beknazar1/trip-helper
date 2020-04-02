import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav({displayForm, loggedIn, handleLogout, username}) {
  const classes = useStyles()

  const loggedOutNav = (
    <React.Fragment>
      <Button color="inherit" onClick={() => displayForm('login')}>login</Button>
      <Button color="inherit" onClick={() => displayForm('signup')}>signup</Button>
    </React.Fragment>
  );

  const loggedInNav = (
    <React.Fragment>
      <Typography className={classes.title}>Welcome, {username.charAt(0).toUpperCase() + username.slice(1)}!</Typography>
      <Button color="inherit" onClick={handleLogout} className={classes.menuButton}>logout</Button>
    </React.Fragment>
  )
  return (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        {loggedIn ? loggedInNav : loggedOutNav}
      </Toolbar>
    </AppBar>
  </div>
  )
}

export default Nav

