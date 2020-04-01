import React, {useState, useEffect} from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import {makeStyles} from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {getStaticMap, getWeatherInfo} from '../api'
import Skeleton from '@material-ui/lab/Skeleton'

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
        {image
          ?
          <CardMedia
            className={classes.media}
            image={URL.createObjectURL(image)}
            title={`${direction + location}`}
          />
          :
          <Skeleton variant="rect" height={500} animation="wave"/>
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {direction + location}
          </Typography>
          {weather
            ?
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
            </React.Fragment>
            :
            <React.Fragment>
              <Skeleton height={24} width={500}/>
              <Skeleton height={24} width={150}/>
              <Skeleton height={24} width={150}/>
              <Skeleton height={24} width={150}/>
            </React.Fragment>
          }
        </CardContent>
      </CardActionArea>
    </Card>

  )
}

export default LocationMap