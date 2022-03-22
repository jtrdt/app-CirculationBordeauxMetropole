import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import UserContext from '../../contexts/userContext.jsx';
import Footer from './footer.jsx';
import Header from './header.jsx';
import NavBar from './navbar.jsx';

const Layout = ({ children }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const userToken = sessionStorage.getItem('user');
    if (userToken) {
      const decoded = jwt_decode(sessionStorage.getItem('user'));
      setUser(decoded);
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Header />
      <NavBar />
      <main className='px-16 py-8 bg-transparent-bg'>{children}</main>
      <Footer />
    </UserContext.Provider>
  );
};

export default Layout;

Layout.prototype = {
  children: PropTypes.node.isRequired
};
