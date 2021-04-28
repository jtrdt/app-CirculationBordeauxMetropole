import React from 'react';
import BoucleTable from '../../src/components/bouclesComp/boucleTable';
import Layout from '../../src/components/layout/layout';

const Table = ({ boucleData }) => {
  return (
    <Layout>
      <BoucleTable data={boucleData} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_BOUCLE_URL);
  const boucleData = await res.json();
  return {
    props: { boucleData }
  };
}

export default Table;
