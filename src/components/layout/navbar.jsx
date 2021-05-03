import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='bg-yellow-400 text-center flex'>
      <Link href='/'>
        <a className='hover:bg-gray-500 mx-2'>Accueil</a>
      </Link>
      <Link href='/auth'>
        <a className='hover:bg-gray-500 mx-2'>SignUp/Login</a>
      </Link>
      <Link href='/boucle'>
        <a className='hover:bg-gray-500 mx-2'>Boucles</a>
      </Link>
      <Link href='/test-comp'>
        <a className='hover:bg-gray-500 mx-2'>Test-Component</a>
      </Link>
    </nav>
  );
};

export default NavBar;
