/* eslint-disable @next/next/no-page-custom-font */
import { ChildrenProps } from 'types/ReactTypes'
import {
  Flex,
  Box,
  Link as ChakraLink,
  Text,
  Container,
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

type CryptoPageProps = ChildrenProps & { title: string | undefined }

const navlinks = [
  {
    heading: 'Crypto Home',
    path: '/Cryptos/Home',
  },
  {
    heading: 'About',
    path: '/Cryptos/About',
  },
  {
    heading: 'Optimizations Page',
    path: '/Optimizations',
  },
  {
    heading: 'Default Home Page',
    path: '/'
  }
]

const CryptoPageLayout = ({ children, title }: CryptoPageProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
          rel="stylesheet"
        />
        <style data-href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap">
          {`body {
                font-family: 'Inconsolata', monospace!important;
            }`}
        </style>
      </Head>

      <Box width="100vw" height="100vh">
        <Box shadow="md" w="100%" mb="20px" p="10px" bg="white">
          <Container
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            maxW="container.xl"
          >
            <Text as="h1" fontSize="36px" fontWeight="bold">
              Cryptos
            </Text>
            <Flex>
              {navlinks.map((value) => (
                <Link passHref href={value.path} key={value.heading}>
                  <ChakraLink padding="10px">{value.heading}</ChakraLink>
                </Link>
              ))}
            </Flex>
          </Container>
        </Box>
        <Container maxW="container.xl">{children}</Container>
      </Box>
    </>
  )
}

export default CryptoPageLayout
