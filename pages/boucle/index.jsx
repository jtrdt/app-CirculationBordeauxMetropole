import React from 'react';
import Boucle from '../../src/components/boucle.jsx';
import Layout from '../../src/components/layout/layout.jsx';

const Boucles = ({ boucleData }) => {
  console.log(boucleData);
  return (
    <Layout>
      <h1>Tableau des boucles coupées</h1>
      {boucleData.map((data, i) => (
        <Boucle data={data} key={i} />
      ))}
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

export default Boucles;
