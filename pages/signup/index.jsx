import React from 'react';
import Head from 'next/head';

import SignUpForm from '../../src/components/auth/signupForm.jsx';
import Layout from '../../src/components/layout/layout.jsx';

function Home() {
  return (
    <Layout>
      <Head>
        <title>Inscription - PC Circulation Bordeaux Métropole</title>
      </Head>
      <SignUpForm />
    </Layout>
  );
}

export default Home;
