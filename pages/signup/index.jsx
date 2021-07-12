import React from 'react';
import Head from 'next/head';
import SignUpForm from '../../src/components/auth/signupForm';

const Home = () => {
  return (
    <div className='bg-home h-screen flex'>
      <Head>
        <title>PC Circulation Bordeaux Métropole</title>
      </Head>
      <div className='m-auto'>
        <SignUpForm />
      </div>
    </div>
  );
};

export default Home;
