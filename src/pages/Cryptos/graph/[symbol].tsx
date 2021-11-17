import { Box, HStack, Button, Text } from '@chakra-ui/react'
import getCoinHistory from 'api/coinrank/getCoinHistory'
import LineGraph from 'components/Graphs/LineGraph'
import CryptoPageLayout from 'components/Layout/CryptoPageLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HistoryProps } from 'types/CryptoTypes'

const timeFrame = ['7d', '30d', '1y']

const CrpytoGraphPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Array<HistoryProps>>([])
  const [config, setConfig] = useState<string>('7d')

  useEffect(() => {
    if (!router.isReady) return
    async function loadData() {
      try {
        const response = await getCoinHistory(
          router.query.symbol as string,
          config
        )

        console.log(response)
        setLoading(false)
        setData(response.history)
      } catch (error) {
        router.push('/Cryptos/Home')
      }
    }
    if ('symbol' in router.query) {
      loadData()
    } else {
      router.push('/Cryptos/Home')
    }
  }, [router.isReady, config])

  return (
    router.isReady &&
    !loading && (
      <CryptoPageLayout title={router.query.symbol as string}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="h1" mb="20px" fontSize="48px">
            {router.query.name}
          </Text>
          <HStack>
            {timeFrame.map((time) => (
              <Button
                onClick={() => setConfig(time)}
                key={time}
                colorScheme="blue"
                border="none"
                cursor="pointer"
              >
                {time}{' '}
              </Button>
            ))}
          </HStack>
          {data.length > 0 && (
            <Box h="700px" w="800px">
              <LineGraph data={data} />
            </Box>
          )}
        </Box>
      </CryptoPageLayout>
    )
  )
}

export default CrpytoGraphPage
