import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button, TextField} from '@material-ui/core'
import {tripCreate, tripDetail, tripUpdate} from '../api';
import {useParams, useHistory} from 'react-router-dom';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {KeyboardDatePicker} from '@material-ui/pickers'
import Autocomplete from '@material-ui/lab/Autocomplete'
import moment from 'moment'
import Skeleton from '@material-ui/lab/Skeleton'

const states = [
  {
    'name': 'Alabama',
    'abbreviation': 'AL',
  },
  {
    'name': 'Alaska',
    'abbreviation': 'AK',
  },
  {
    'name': 'American Samoa',
    'abbreviation': 'AS',
  },
  {
    'name': 'Arizona',
    'abbreviation': 'AZ',
  },
  {
    'name': 'Arkansas',
    'abbreviation': 'AR',
  },
  {
    'name': 'California',
    'abbreviation': 'CA',
  },
  {
    'name': 'Colorado',
    'abbreviation': 'CO',
  },
  {
    'name': 'Connecticut',
    'abbreviation': 'CT',
  },
  {
    'name': 'Delaware',
    'abbreviation': 'DE',
  },
  {
    'name': 'District Of Columbia',
    'abbreviation': 'DC',
  },
  {
    'name': 'Federated States Of Micronesia',
    'abbreviation': 'FM',
  },
  {
    'name': 'Florida',
    'abbreviation': 'FL',
  },
  {
    'name': 'Georgia',
    'abbreviation': 'GA',
  },
  {
    'name': 'Guam',
    'abbreviation': 'GU',
  },
  {
    'name': 'Hawaii',
    'abbreviation': 'HI',
  },
  {
    'name': 'Idaho',
    'abbreviation': 'ID',
  },
  {
    'name': 'Illinois',
    'abbreviation': 'IL',
  },
  {
    'name': 'Indiana',
    'abbreviation': 'IN',
  },
  {
    'name': 'Iowa',
    'abbreviation': 'IA',
  },
  {
    'name': 'Kansas',
    'abbreviation': 'KS',
  },
  {
    'name': 'Kentucky',
    'abbreviation': 'KY',
  },
  {
    'name': 'Louisiana',
    'abbreviation': 'LA',
  },
  {
    'name': 'Maine',
    'abbreviation': 'ME',
  },
  {
    'name': 'Marshall Islands',
    'abbreviation': 'MH',
  },
  {
    'name': 'Maryland',
    'abbreviation': 'MD',
  },
  {
    'name': 'Massachusetts',
    'abbreviation': 'MA',
  },
  {
    'name': 'Michigan',
    'abbreviation': 'MI',
  },
  {
    'name': 'Minnesota',
    'abbreviation': 'MN',
  },
  {
    'name': 'Mississippi',
    'abbreviation': 'MS',
  },
  {
    'name': 'Missouri',
    'abbreviation': 'MO',
  },
  {
    'name': 'Montana',
    'abbreviation': 'MT',
  },
  {
    'name': 'Nebraska',
    'abbreviation': 'NE',
  },
  {
    'name': 'Nevada',
    'abbreviation': 'NV',
  },
  {
    'name': 'New Hampshire',
    'abbreviation': 'NH',
  },
  {
    'name': 'New Jersey',
    'abbreviation': 'NJ',
  },
  {
    'name': 'New Mexico',
    'abbreviation': 'NM',
  },
  {
    'name': 'New York',
    'abbreviation': 'NY',
  },
  {
    'name': 'North Carolina',
    'abbreviation': 'NC',
  },
  {
    'name': 'North Dakota',
    'abbreviation': 'ND',
  },
  {
    'name': 'Northern Mariana Islands',
    'abbreviation': 'MP',
  },
  {
    'name': 'Ohio',
    'abbreviation': 'OH',
  },
  {
    'name': 'Oklahoma',
    'abbreviation': 'OK',
  },
  {
    'name': 'Oregon',
    'abbreviation': 'OR',
  },
  {
    'name': 'Palau',
    'abbreviation': 'PW',
  },
  {
    'name': 'Pennsylvania',
    'abbreviation': 'PA',
  },
  {
    'name': 'Puerto Rico',
    'abbreviation': 'PR',
  },
  {
    'name': 'Rhode Island',
    'abbreviation': 'RI',
  },
  {
    'name': 'South Carolina',
    'abbreviation': 'SC',
  },
  {
    'name': 'South Dakota',
    'abbreviation': 'SD',
  },
  {
    'name': 'Tennessee',
    'abbreviation': 'TN',
  },
  {
    'name': 'Texas',
    'abbreviation': 'TX',
  },
  {
    'name': 'Utah',
    'abbreviation': 'UT',
  },
  {
    'name': 'Vermont',
    'abbreviation': 'VT',
  },
  {
    'name': 'Virgin Islands',
    'abbreviation': 'VI',
  },
  {
    'name': 'Virginia',
    'abbreviation': 'VA',
  },
  {
    'name': 'Washington',
    'abbreviation': 'WA',
  },
  {
    'name': 'West Virginia',
    'abbreviation': 'WV',
  },
  {
    'name': 'Wisconsin',
    'abbreviation': 'WI',
  },
  {
    'name': 'Wyoming',
    'abbreviation': 'WY',
  },
]

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const TripCreateEdit = () => {
  const {tripId} = useParams()
  const history = useHistory()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [scheduledDate, setScheduledDate] = useState(new Date())
  const [originCity, setOriginCity] = useState('')
  const [originState, setOriginState] = useState('')
  const [destinationCity, setDestinationCity] = useState('')
  const [destinationState, setDestinationState] = useState('')

  useEffect(() => {
    if (tripId) {
      tripDetail(tripId).then(r => {
        setName(r.data.name)
        setScheduledDate(moment(r.data.scheduled_date))
        setOriginCity(r.data.origin_city)
        setOriginState(states.find(state => state.abbreviation === r.data.origin_state).name)
        setDestinationCity(r.data.destination_city)
        setDestinationState(states.find(state => state.abbreviation === r.data.destination_state).name)
      })
    }
  }, [tripId])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name,
      scheduledDate: moment(scheduledDate).format('YYYY-MM-DD'),
      originCity,
      originState: states.find(state => state.name === originState).abbreviation,
      destinationCity,
      destinationState: states.find(state => state.name === destinationState).abbreviation,
    }

    let apiCall = tripId ? tripUpdate : tripCreate

    apiCall(data, tripId).then(r => {
      history.push(`/trips/${tripId || r.data.id}`)
    })
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        {(tripId && !name) ? <Skeleton variant="rect" width={550} height={276} /> :
          <Grid container component="form" spacing={3} onSubmit={handleSubmit}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                label="Name"
                onChange={e => setName(e.target.value)}
                value={name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                required
                autoOk
                variant="inline"
                label="Scheduled date"
                format="MM/DD/YYYY"
                value={scheduledDate}
                InputAdornmentProps={{position: 'start'}}
                onChange={date => setScheduledDate(date)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="origin-city"
                label="Origin City"
                onChange={e => setOriginCity(e.target.value)}
                value={originCity}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="origin-state"
                options={states}
                value={originState}
                getOptionLabel={option => option}
                renderInput={params => <TextField {...params} label="Origin State"/>}
                onChange={(e, v) => setOriginState(v.name)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="destination-city"
                label="City of Destination"
                onChange={e => setDestinationCity(e.target.value)}
                value={destinationCity}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="destination-state"
                options={states}
                value={destinationState}
                getOptionLabel={option => option}
                renderInput={params => <TextField {...params} label="Origin State"/>}
                onChange={(e, v) => setDestinationState(v.name)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary"
                      type="submit">{tripId ? 'Update' : 'Create'} Trip</Button>
            </Grid>

          </Grid>
        }
      </Paper>
    </main>
  )
  // }
}

export default TripCreateEdit