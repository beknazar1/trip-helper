import React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'

const LocationMap = ({location}) => {
  return (
    <Card>
      <CardMedia
        height="500"
        component="iframe"
        src={`https://www.google.com/maps/embed/v1/place?q=${location}&key=${process.env.REACT_APP_GOOGLE_MAPS}`}
      />
    </Card>

  )
}

export default LocationMap