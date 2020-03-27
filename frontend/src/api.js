import axios from 'axios'

const API = 'http://localhost:8000/api/'

const django = axios.create({
  baseURL: API,
  timeout: 1000,
  headers: {'Authorization': `JWT ${localStorage.getItem('token')}`},
})

export const tripList = () => django.get('trips/')