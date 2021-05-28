import React from 'react';
import Head from 'next/head';

import Layout from '../src/components/layout/layout.jsx';
import LoginForm from '../src/components/auth/loginForm.jsx';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Accueil - PC Circulation Bordeaux Métropole</title>
      </Head>
      <LoginForm />
    </Layout>
  );
};

export default Home;
