import { Box, Flex } from '@chakra-ui/react'
import CryptoPageLayout from 'components/Layout/CryptoPageLayout'
import { useEffect, useState } from 'react'
import getCoins from 'api/coinrank/getCoins'
import CryptoCard from 'components/ImageCard/CryptoCard'

type obj = {
  [key: string]: any
}

const CryptoHomePage = () => {
  const [coins, setCoins] = useState<Array<obj>>([])

  useEffect(() => {
    async function loadCoins() {
      try {
        const response = await getCoins()
        setCoins(response.coins)
      } catch (error) {
        console.log(error)
      }
    }

    loadCoins()
  }, [])

  return (
    <CryptoPageLayout title="Cryptos Home Page">
      <Flex flexWrap="wrap">
        {coins.map((values) => {
          return (
            <Box p="10px" key={values.uuid} w="20%">
              <CryptoCard
                uuid={values.uuid}
                symbol={values.symbol}
                change={parseFloat(values.change)}
                iconUrl={values.iconUrl}
                colorCode={values.color}
                price={parseFloat(values.price)}
              />{' '}
            </Box>
          )
        })}
      </Flex>
    </CryptoPageLayout>
  )
}

export default CryptoHomePage
