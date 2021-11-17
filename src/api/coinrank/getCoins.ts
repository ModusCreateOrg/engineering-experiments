import { coinRankAPI as API } from 'config/axios'

export default async function getCoins() {
  const { data } = await API({
    method: 'get',
    url: '/coins',
  })

  return data.data
}
