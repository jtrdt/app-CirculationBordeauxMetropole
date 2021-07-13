import React from 'react';
import Head from 'next/head';

import ResetPasswordForm from '../../src/components/auth/resetPassword.jsx';

const Home = () => {
  return (
    <div className='bg-home h-screen flex'>
      <Head>
        <title>PC Circulation Bordeaux Métropole</title>
      </Head>
      <div className='m-auto'>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default Home;
