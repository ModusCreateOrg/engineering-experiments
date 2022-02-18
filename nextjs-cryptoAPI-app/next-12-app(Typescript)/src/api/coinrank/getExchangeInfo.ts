import { coinRankAPI as API } from 'config/axios'

export default async function getExchangeInfo() {
    const randomOffset = Math.floor(Math.random() * 20) 
    
    const { data } = await API({
    method: 'get',
    url: `exchanges`,
  })

  console.log(data)

  return data.data
}
