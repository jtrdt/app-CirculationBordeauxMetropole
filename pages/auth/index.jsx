import React from 'react';

import SignUpForm from '../../src/components/auth/signupForm.jsx';
import LoginForm from '../../src/components/auth/loginForm.jsx';
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
