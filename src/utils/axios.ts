import axios from 'axios'

export const patientAPI = axios.create({
  baseURL: process.env.REACT_APP_PATIENT_API
})