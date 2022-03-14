import { NavigationBar } from '../src/Common/components/NavigationBar'
import { ChartProvider } from '../src/Common/contexts/Chart'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <ChartProvider>
      <div className="container">
        <NavigationBar />
        <Component {...pageProps} />
      </div>
    </ChartProvider>
  )
}

export default MyApp
