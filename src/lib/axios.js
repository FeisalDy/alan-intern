import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

console.log('BACKEND_URL:', process.env.BACKEND_URL)
export default axios
