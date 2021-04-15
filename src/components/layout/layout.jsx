import Head from 'next/head';

import Header from './header.jsx';
import NavBar from './navbar.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>PCBM title</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Dosis&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Header />
      <NavBar />
      <div>  
        { children }
      </div>
    </>
  );
};

export default Layout;
