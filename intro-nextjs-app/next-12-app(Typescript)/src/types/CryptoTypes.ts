export type CryptoCardProps = {
  uuid: string
  iconUrl: string
  colorCode: string
  symbol: string
  change: number
  price: number
}

export type Coin = {
  symbol: string
  description: string
  price: number | null
  iconUrl: string
  uuid: string
}

export type HistoryProps = {
  price: number
  timestamp: number
}
