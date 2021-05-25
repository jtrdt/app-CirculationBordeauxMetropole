import { useEffect, useMemo, useState } from 'react';
import jwt_decode from 'jwt-decode';

import Header from './header.jsx';
import NavBar from './navbar.jsx';
import Footer from './footer.jsx';

import UserContext from '../../contexts/userContext.jsx';

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
