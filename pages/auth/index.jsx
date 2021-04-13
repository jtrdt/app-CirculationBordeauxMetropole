import React from 'react';

import Header from '../../src/components/layout/header.jsx';
import SignUpForm from '../../src/components/signupForm.jsx';
import LoginForm from '../../src/components/loginForm.jsx';

function Home() {
  return (
    <div>
      <Header />
      <SignUpForm />
      <LoginForm />
    </div>
  );
}

export default Home;
