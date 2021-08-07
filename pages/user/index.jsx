import React from 'react';

import Layout from '../../src/components/layout/layout.jsx';
import UpdatePasswordForm from '../../src/components/auth/updatePassword.jsx';

const user = () => {
  return (
    <Layout>
      <UpdatePasswordForm />
    </Layout>
  );
};

export default user;
