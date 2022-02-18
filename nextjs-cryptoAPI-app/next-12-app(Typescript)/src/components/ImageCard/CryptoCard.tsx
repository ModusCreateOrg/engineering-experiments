import { CryptoCardProps } from 'types/CryptoTypes'
import { Box, Text, Button, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const CryptoCard = ({
  iconUrl,
  uuid,
  colorCode,
  symbol,
  change,
  price,
}: CryptoCardProps) => {
  const router = useRouter()
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      borderColor={colorCode}
      borderStyle="solid"
      shadow="md"
      h="250px"
      bg="white"
      borderRadius="5px"
      borderWidth="2px"
    >
      <Text fontSize="24px" fontWeight="bold">
        {symbol}
      </Text>
      <Text fontSize="24px" fontWeight="bold">
        {price.toFixed(5)}
      </Text>
      <Text
        color={change >= 0 ? 'green' : 'red'}
        fontSize="24px"
        fontWeight="bold"
      >
        {change}
      </Text>
      <Image width="64px" height="64px" src={iconUrl} alt={symbol} />
      <HStack>
        <Link passHref href={`/Cryptos/coin/${uuid}`}>
          <Button colorScheme="teal" border="none" cursor="pointer" size="md">
            Info
          </Button>
        </Link>

        <Button
          onClick={() =>
            router.push({
              pathname: 'graph/[symbol]',
              query: { symbol: uuid, name: symbol },
            })
          }
          colorScheme="blue"
          border="none"
          cursor="pointer"
          size="md"
        >
          Graph
        </Button>
      </HStack>
    </Box>
  )
}

export default CryptoCard
