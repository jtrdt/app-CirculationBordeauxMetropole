import React from 'react';
import Head from 'next/head';
import TableAdmin from '../../src/components/admin/dashboard.jsx';

import Layout from '../../src/components/layout/layout.jsx';

function Home() {
  return (
    <Layout>
      <Head>
        <title>Dashboard ADMIN - PC Circulation Bordeaux Métropole</title>
      </Head>
      {/* <TableAdmin /> */}
    </Layout>
  );
}

export default Home;
