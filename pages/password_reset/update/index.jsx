import React from 'react';
import Head from 'next/head';
import UpdateResetPassword from '../../../src/components/auth/updateResetPassword';

const Home = () => {
  return (
    <div className='bg-home h-screen bg-cover overflow-auto flex'>
      <Head>
        <title>PC Circulation Bordeaux Métropole</title>
      </Head>
      <div className='m-auto'>
        <UpdateResetPassword />
      </div>
    </div>
  );
};

export default Home;
