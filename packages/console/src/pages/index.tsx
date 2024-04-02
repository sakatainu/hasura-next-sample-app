import { NextPage } from 'next';
import Head from 'next/head';
import Main from '~/components/page/Index';

const Index: NextPage = () => (
  <>
    <Head>
      <title>home</title>
    </Head>
    <Main />
  </>
);

export default Index;
