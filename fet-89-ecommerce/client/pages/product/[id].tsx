import Head from 'next/head';
import { ProductScreen } from '../../src/Product';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fresh Foods - Product</title>
        <meta name="description" content="A simple organic food e-commerce." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ProductScreen />
      </main>
    </div>
  );
};
