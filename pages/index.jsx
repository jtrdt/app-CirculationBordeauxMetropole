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
      <div className='flex'>
        <LoginForm />
        <div className='relative left-14 top-8 mb-8'>
          <a
            className='twitter-timeline'
            data-width='330'
            data-height='500'
            data-dnt='true'
            data-theme='light'
            href='https://twitter.com/CirculationBxM?ref_src=twsrc%5Etfw'
          >
            Tweets by CirculationBxM
          </a>
          <script
            async
            src='https://platform.twitter.com/widgets.js'
          ></script>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
