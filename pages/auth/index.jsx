import React from 'react';

import SignUpForm from '../../src/components/signupForm.jsx';
import LoginForm from '../../src/components/loginForm.jsx';
import Layout from '../../src/components/layout/layout.jsx';

function Home() {
  return (
    <Layout>
      <SignUpForm />
      <LoginForm />
    </Layout>
  );
}

export default Home;
