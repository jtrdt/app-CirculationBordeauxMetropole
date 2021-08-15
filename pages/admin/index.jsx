import React from 'react';
import Head from 'next/head';

import Layout from '../../src/components/layout/layout.jsx';
import DashboardAdmin from '../../src/components/admin/dashboard.jsx';

function Home() {
  return (
    <Layout>
      <Head>
        <title>Dashboard ADMIN - PC Circulation Bordeaux Métropole</title>
      </Head>
      <DashboardAdmin />
    </Layout>
  );
}

export default Home;
