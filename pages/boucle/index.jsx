import React from 'react';
import Head from 'next/head';
import Layout from '../../src/components/layout/layout.jsx';
import BoucleTable from '../../src/components/bouclesComp/boucleTable.jsx';

const Boucles = ({ boucles, events }) => {
  return (
    <Layout>
      <Head>
        <title>PC Circulation Bordeaux Métropole</title>
      </Head>
      <BoucleTable data={boucles} events={events} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const resBoucles = await fetch(process.env.NEXT_PUBLIC_BOUCLE_URL);
  const resEvents = await fetch(process.env.NEXT_PUBLIC_EVENT_URL);
  const boucles = await resBoucles.json();
  const events = await resEvents.json();
  return {
    props: { boucles, events }
  };
};

export default Boucles;
