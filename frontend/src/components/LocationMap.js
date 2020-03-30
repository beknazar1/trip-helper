import React, {useState, useEffect} from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import {makeStyles} from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 500,
  },
})

const LocationMap = ({direction, location}) => {
  const classes = useStyles()
  const [image, setImage] = useState(null)

  const fetchImage = () => {
    fetch(`http://localhost:8000/api/images/?city=${location}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
        .then(res => res.blob())
        .then(img => setImage(img))
  }

  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <Card
      className={classes.root}
    >
      <CardActionArea>
        {image && <CardMedia
          className={classes.media}
          image={URL.createObjectURL(image)}
          title={`${direction + location}`}
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {direction + location}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>

  )
}

export default LocationMap