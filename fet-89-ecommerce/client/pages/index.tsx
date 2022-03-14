import Head from 'next/head'
import { HomeScreen } from '../src/Home'

export default function Home() {
  return (
    <div>
      <Head>
      <title>Fresh Foods - Home</title>
        <meta name="description" content="A simple organic food e-commerce." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomeScreen />
      </main>
    </div>
  )
}
