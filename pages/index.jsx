import React from 'react';

import Layout from '../src/components/layout/layout.jsx';
import LoginForm from '../src/components/auth/loginForm.jsx';

const Home = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default Home;
