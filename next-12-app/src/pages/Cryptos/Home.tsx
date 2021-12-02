import { Box, Flex, Text, Link } from '@chakra-ui/react'
import CryptoPageLayout from 'components/Layout/CryptoPageLayout'
import { useEffect, useState } from 'react'
import getCoins from 'api/coinrank/getCoins'
import CryptoCard from 'components/ImageCard/CryptoCard'
import allCoins from 'api/coinrank/coins.json'

type obj = {
  [key: string]: any
}

const CryptoHomePage = () => {
  const [coins, setCoins] = useState<Array<obj>>(allCoins.data.coins)

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
      <>
        <Text as="h1" fontSize="36px">
          Due to a recent issue with api,the links will only work if it is called from a server. 
          The coins you see here are currently called from a local
          json file.Please request temporary access for now in order for the links to work.
          <Link
            color="blue.400"
            target="_blank"
            href="https://cors-anywhere.herokuapp.com/corsdemo"
          >
            Click here
          </Link>
        </Text>
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
      </>
    </CryptoPageLayout>
  )
}

export default CryptoHomePage
