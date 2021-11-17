/* eslint-disable react-hooks/exhaustive-deps */
import CryptoPageLayout from 'components/Layout/CryptoPageLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import getSingleCoin from 'api/coinrank/getSingleCoin'
import { Text, Box } from '@chakra-ui/react'
import { Coin } from 'types/CryptoTypes'
import Image from 'next/image'
import ReactHtmlParser from 'react-html-parser'

const CryptoPage = () => {
  const router = useRouter()
  const { query } = router
  const [coin, setCoin] = useState<Coin>({
    symbol: '',
    description: '',
    price: null,
    iconUrl: '',
    uuid: '',
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!router.isReady) return
    async function loadData() {
      try {
        const response = await getSingleCoin(query.symbol as '')
        setLoading(false)
        setCoin(response.coin)
      } catch (error) {
        router.push('/Cryptos/Home')
      }
    }
    if ('symbol' in query) {
      loadData()
    } else {
      router.push('/Cryptos/Home')
    }
  }, [router.isReady])

  return (
    router.isReady &&
    !loading && (
      <CryptoPageLayout title={coin.symbol}>
        <>
          <Box
            display="flex"
            justifyContent="center"
            mb="20px"
            alignItems="center"
          >
            <Text mr="8px" fontSize="64px">
              {coin.symbol}
            </Text>
            {coin.iconUrl && (
              <Image
                src={coin.iconUrl}
                width="64px"
                height="64px"
                alt={coin.symbol}
              />
            )}
          </Box>
          <Box>{ReactHtmlParser(coin.description)}</Box>
        </>
      </CryptoPageLayout>
    )
  )
}

export default CryptoPage
