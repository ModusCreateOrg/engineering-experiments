import DefaultErrorPage from 'next/error'
import Head from 'next/head'

const Error = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  )
}

export default Error
