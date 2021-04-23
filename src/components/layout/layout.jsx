import Header from './header.jsx';
import NavBar from './navbar.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
