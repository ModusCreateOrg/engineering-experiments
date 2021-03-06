import Navbar from 'components/Navbar/Navbar'
import CryptoIntro from 'components/CryptoIntro/CryptoIntro'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Simple Next Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <CryptoIntro />
    </div>
  )
}
