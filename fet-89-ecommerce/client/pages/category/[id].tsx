import Head from 'next/head';
import { useRouter } from 'next/router';
import { CategoryScreen } from '../../src/Category';
import { CATEGORIES_MOCK } from '../../src/Home/MOCK';

export default function Category() {
  const router = useRouter();

  const id = router.query.id;

  return (
    <div>
      <Head>
        <title>{CATEGORIES_MOCK[Number(id) - 1]} - Category</title>
        <meta name="description" content="A simple organic food e-commerce." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CategoryScreen id={id} />
      </main>
    </div>
  );
};
