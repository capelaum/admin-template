import axios from 'axios'

const baseUrl =
  process.env.ENV === 'production'
    ? process.env.NEXT_PUBLIC_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_BASE_URL_DEV

export const api = axios.create({
  baseURL: baseUrl
})
