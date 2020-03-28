import axios from 'axios'

const API = 'http://localhost:8000/api/'

const django = axios.create({
  baseURL: API,
  timeout: 15000,
  headers: {'Authorization': `JWT ${localStorage.getItem('token')}`},
})

export const tripList = () => django.get('trips/')

export const tripCreate = (data) => django.post('trips/', {
  'name': data.name,
  'scheduled_date': data.scheduledDate,
  'origin_city': data.originCity,
  'origin_state': data.originState,
  'destination_city': data.destinationCity,
  'destination_state': data.destinationState,
})

export const tripDetail = (tripId) => django.get(`trips/${tripId}/`).catch(err => err.response)

export const tripUpdate = (data, tripId) => django.put(`trips/${tripId}/`, {
  'name': data.name,
  'scheduled_date': data.scheduledDate,
  'origin_city': data.originCity,
  'origin_state': data.originState,
  'destination_city': data.destinationCity,
  'destination_state': data.destinationState,
})
export const tripDelete = (tripId) => django.delete(`trips/${tripId}/`)