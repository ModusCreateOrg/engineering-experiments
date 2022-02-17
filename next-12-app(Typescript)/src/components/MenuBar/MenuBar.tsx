import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import MenuCard from './MenuCard'

const topics = [
  {
    heading: 'Optimizations',
    path: '/Optimizations',
  },
  {
    heading: 'Example Project',
    path: '/Cryptos/Home',
  },
]

const MenuBar: FC = () => {
  return (
    <Box bg="white" w="800px" shadow="xl" borderRadius="3px">
      <Flex flexWrap="wrap">
        {topics.map((card) => (
          <MenuCard key={card.heading} {...card} />
        ))}
      </Flex>
    </Box>
  )
}

export default MenuBar
