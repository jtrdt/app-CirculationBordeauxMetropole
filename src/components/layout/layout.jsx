import Header from './header.jsx';
import NavBar from './navbar.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
