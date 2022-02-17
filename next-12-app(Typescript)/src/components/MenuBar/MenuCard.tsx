import { Box, Text, Flex, Link as ChakraLink } from '@chakra-ui/react'
import { MenuCardType } from 'types/MenuTypes'
import Link from 'next/link'

const MenuCard = ({ heading, path }: MenuCardType) => {
  return (
    <Box w="50%" p="10px">
      <Link passHref href={path}>
        <ChakraLink>
          <Flex
            justifyContent="center"
            alignItems="center"
            border="2px"
            borderColor="blue.500"
            shadow="sm"
            minH="200px"
            borderRadius="3px"
          >
            <Text as="h2" fontSize="2xl">
              {heading}
            </Text>
          </Flex>
        </ChakraLink>
      </Link>
    </Box>
  )
}

export default MenuCard
