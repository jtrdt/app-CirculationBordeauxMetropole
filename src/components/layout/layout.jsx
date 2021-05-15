import Header from './header.jsx';
import NavBar from './navbar.jsx';
import Footer from './footer.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      <main className='px-16 py-8 bg-transparent-bg'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
