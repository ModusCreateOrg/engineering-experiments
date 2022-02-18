import axios from 'axios'

export const coinRankAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'x-access-token': process.env.NEXT_PUBLIC_API_KEY || '',
  },
})
