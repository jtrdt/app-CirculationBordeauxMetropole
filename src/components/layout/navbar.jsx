import Link from 'next/link';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      const decoded = jwt_decode(userToken);
      setUser(decoded.userName);
      setIsAdmin(decoded.admin);
    }
  }, [user]);

  const logout = () => {
    localStorage.clear();
    setUser();
  };

  return (
    <nav className='bg-yellow-400 text-center'>
      <Link href='/'>
        <a className='hover:bg-gray-500 mx-2'>Accueil/Login</a>
      </Link>
      <Link href='/boucle'>
        <a className='hover:bg-gray-500 mx-2'>Tableaux</a>
      </Link>
      <Link href='/test-comp'>
        <a className='hover:bg-gray-500 mx-2'>Test-Component</a>
      </Link>
      {isAdmin && (
        <Link href='/admin'>
          <a className='hover:bg-gray-500 text-red-700 font-bold mx-2'>Admin</a>
        </Link>
      )}
      {user && (
        <div className='flex'>
          <p className='mx-2'>Bonjour : {user}</p>
          <button className='underline text-blue-600' onClick={logout}>
            logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
