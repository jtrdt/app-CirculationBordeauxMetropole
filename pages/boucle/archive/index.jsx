import React from 'react';
import Head from 'next/head';

import Layout from '../../../src/components/layout/layout.jsx';
import ArchiveTable from '../../../src/components/bouclesComp/archiveTable.jsx';

const Home = archives => {
  return (
    <Layout>
      <Head>
        <title>Archives - PC Circulation Bordeaux Métropole</title>
      </Head>
      <ArchiveTable data={archives} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const resArchives = await fetch(process.env.NEXT_PUBLIC_ARCHIVE_URL);
  const archives = await resArchives.json();
  return {
    props: { archives }
  };
};

export default Home;
