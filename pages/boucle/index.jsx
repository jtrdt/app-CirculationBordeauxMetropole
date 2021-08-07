import React from 'react';
import Head from 'next/head';
import Layout from '../../src/components/layout/layout.jsx';
import BoucleTable from '../../src/components/bouclesComp/boucleTable.jsx';

const Boucles = ({ boucles }) => {
  return (
    <Layout>
      <Head>
        <title>PC Circulation Bordeaux Métropole</title>
      </Head>
      <BoucleTable data={boucles} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BOUCLE_URL);
  const boucles = await res.json();
  return {
    props: { boucles }
  };
};

export default Boucles;
