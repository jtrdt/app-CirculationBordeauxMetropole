import React from 'react';
import Head from 'next/head';
import TableBoucleArchive from '../../../src/components/bouclesComp/tableArchive.jsx';

import Layout from '../../../src/components/layout/layout.jsx';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Archives - PC Circulation Bordeaux Métropole</title>
      </Head>
      <h2 className='pb-4 font-medium text-lg'>Archivages et abandons</h2>
      {/* <TableBoucleArchive /> */}
    </Layout>
  );
};

export default Home;
