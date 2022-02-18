import { coinRankAPI as API } from 'config/axios'

export default async function getSingleCoin(params: string) {
  const { data } = await API({
    method: 'get',
    url: `coin/${params}`,
  })

  return data.data
}
