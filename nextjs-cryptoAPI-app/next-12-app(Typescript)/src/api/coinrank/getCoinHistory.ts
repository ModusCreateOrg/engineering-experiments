import { coinRankAPI as API } from 'config/axios'

export default async function getCoinHistory(uuid: string, config: string) {
  const { data } = await API({
    method: 'get',
    url: `/coin/${uuid}/history?timePeriod=${config}`,
  })

  return data.data
}
