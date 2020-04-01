import React, {useState, useEffect} from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import {makeStyles} from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import {getStaticMap, getWeatherInfo} from '../api'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 500,
  },
})

const LocationMap = ({direction, location, data}) => {
  const classes = useStyles()
  const [image, setImage] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = () => {
      getWeatherInfo(data.lat, data.lon, data.scheduled_date)
        .then(res => res.data)
        .then(jsonData => setWeather(jsonData))
    }

    const fetchImage = () => {
      getStaticMap(location)
        .then(res => res.data)
        .then(img => setImage(img))
    }

    if (data.scheduled_date) {
      fetchWeather()
      fetchImage()
    }
  }, [data, location])

  const w = weather && weather.daily.data[0]

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
          {weather &&
            <React.Fragment>
              <Typography>
                Weather forecast for {data.scheduled_date}: {w.summary || ''}
              </Typography>
              <Typography>
                Chance of {w.precipType || 'precipitation'}: {w.precipProbability * 100 || 0}%
              </Typography>
              <Typography>
                Low: {w.temperatureLow || 'missing'}
              </Typography>
              <Typography>
                High: {w.temperatureHigh || 'missing'}
              </Typography>
            </React.Fragment>}
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