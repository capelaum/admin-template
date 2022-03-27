import axios from 'axios'

const baseUrl =
  process.env.ENV === 'production'
    ? process.env.BASE_URL_PROD
    : process.env.BASE_URL_DEV

export const api = axios.create({
  baseURL: baseUrl
})
