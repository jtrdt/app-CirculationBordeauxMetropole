import React from 'react';
import Head from 'next/head';
import Layout from '../../src/components/layout/layout.jsx';
import BoucleTable from '../../src/components/bouclesComp/bouclesTable.jsx';

const Boucles = ({ events }) => {
  return (
    <Layout>
      <Head>
        <title>PC Circulation Bordeaux Métropole</title>
      </Head>
      <BoucleTable events={events} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const resEvents = await fetch(process.env.NEXT_PUBLIC_EVENT_URL);
  const events = await resEvents.json();
  return {
    props: { events }
  };
};

export default Boucles;
