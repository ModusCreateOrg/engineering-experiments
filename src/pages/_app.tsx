import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import 'styles/module.globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const colors = {
    brand: {
      'blue.100': '#545e75',
      'blue.200': '#63adf2',
      'blue.300': '#a7cced',
      'blue.400': '#304d6d',
      'blue.500': '#82a0bc',
    },
  }

  const theme = extendTheme({ colors })

  return (
    <ChakraProvider resetCSS={false}>
      <Component {...pageProps} theme={theme} />
    </ChakraProvider>
  )
}

export default MyApp
