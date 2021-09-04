import React from 'react';
import Head from 'next/head';

import LoginForm from '../src/components/auth/loginForm.jsx';

const Home = () => {
  return (
    <div className='bg-home h-screen bg-cover overflow-auto flex'>
      <Head>
        <title>PC Circulation Bordeaux Métropole</title>
      </Head>
      <div className='m-auto'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
