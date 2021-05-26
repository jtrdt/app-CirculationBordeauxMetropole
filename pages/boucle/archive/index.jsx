import React from 'react';
import TableBoucleArchive from '../../../src/components/bouclesComp/tableArchive.jsx';

import Layout from '../../../src/components/layout/layout.jsx';

const Home = () => {
  return (
    <Layout>
      <h2 className='pb-4 font-medium text-lg'>Archivages et abandons</h2>
      <TableBoucleArchive />
    </Layout>
  );
};

export default Home;
