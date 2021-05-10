import React from 'react';

import Layout from '../src/components/layout/layout.jsx';
import SignUpForm from '../src/components/auth/signupForm.jsx';
import LoginForm from '../src/components/auth/loginForm.jsx';

const Home = () => {
  return (
    <Layout>
      <SignUpForm />
      <LoginForm />
    </Layout>
  );
};

export default Home;
