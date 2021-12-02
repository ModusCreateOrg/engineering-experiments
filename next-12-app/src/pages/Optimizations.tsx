/* eslint-disable @next/next/no-page-custom-font */
import { Box, Text, HStack, Flex } from '@chakra-ui/react'
import ImageCard from 'components/ImageCard/ImageCard'
import TextBoxOne from 'components/TextBox/TextBoxOne'
import Head from 'next/head'
import ImageTwo from '../../public/images/image-two.jpeg'
import ImageThree from '../../public/images/image-three.jpeg'
import Link from 'next/link'

import Image from 'next/image'

const Images = () => {
  return (
    <>
      <Head>
        <title>Optimizations - New Page</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Antique+B1&display=swap"
          rel="stylesheet"
        />
        <style data-href="https://fonts.googleapis.com/css2?family=Shippori+Antique+B1&display=swap">
          {`body {
                font-family: 'Shippori Antique B1', sans-serif!important;
            }`}
        </style>
      </Head>
      <Text as="h1" fontSize="38px" textAlign="center" mb="10px">
        {' '}
        Optimizations Page
      </Text>
      <Box margin="0 auto" bg="gray.100" minH="100vh" p="30px">
        <Flex justifyContent="space-evenly">
          <TextBoxOne text="Every page can have it's own css or <Head> for SEO and load optimization. Here we will give this page a new layout compare to the home page." />
          <TextBoxOne text="NextJS will automically inline font CSS at build time. This also improves load time. Here we declared a font unique only to this page." />
        </Flex>
        <Text textAlign="center" mb="20px">
        <Link href={'https://nextjs.org/docs/api-reference/next/head'}>    
            <a target="_blank">Click here more info about Next Head </a>
        </Link>
        </Text>
        <Text as="h2" fontSize="30px" mb="20px" textAlign="center">
          {' '}
          Proritize Image Loading Example with Local Files
        </Text>
        <Text textAlign="center" mb="20px">
        <Link href={'https://nextjs.org/docs/basic-features/image-optimization'}>    
            <a target="_blank">Click here more info about Next Image Optimization </a>
        </Link>
        </Text>
        <HStack justifyContent="center" spacing="10">
          <ImageCard>
            <>
              <Text as="h3" color="red" fontSize="20px" mb="20px">
                {' '}
                Priority Image
              </Text>
              <Image
                src="https://images.unsplash.com/photo-1633113215844-b2ddc0411724?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="Picture One"
                width={600}
                height={400}
                objectFit="cover"
                priority
              />
            </>
          </ImageCard>
          <TextBoxOne text="Image Prioritizing main images can help increase user experience for first showing the meaningful content. This works on remote images as well." />
        </HStack>
        <HStack justifyContent="space-evenly" mt="20px" spacing={5}>
          <ImageCard>
            <>
              <Text as="h3" fontSize="20px" mb="20px">
                {' '}
                Normal Load
              </Text>
              <Image
                src={ImageTwo}
                alt="Picture Two"
                objectFit="cover"
                width={250}
                height={250}
              />
            </>
          </ImageCard>
          <ImageCard>
            <>
              <Text as="h3" fontSize="20px" mb="20px">
                {' '}
                Normal Load
              </Text>
              <Image
                src={ImageThree}
                alt="Picture Three"
                width={250}
                height={250}
                objectFit="cover"
              />
            </>
          </ImageCard>
        </HStack>
      </Box>
    </>
  )
}

export default Images
