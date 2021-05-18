import Link from 'next/link';
import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../contexts/userContext';

const NavBar = () => {
  const user = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className='hello navbar sticky top-0 flex justify-between py-2 px-10 bg-transparent-bar'>
      {user.userName && (
        <div className='flex flex-col justify-around'>
          <h3 className='text-gray-600 font-medium text-xl'>
            Bonjour {user.userName}
          </h3>
          <div className='line w-32 h-0.5 my-1'></div>
          <a
            className='lowercase text-base font-medium pb-1 hover:text-gray-800 cursor-pointer'
            onClick={logout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
            se déconnecter
          </a>
        </div>
      )}
      <nav className='my-auto mx-0'>
        <Link href='/'>
          <a className='nav-links__link'>Accueil/Login</a>
        </Link>
        <Link href='/boucle'>
          <a className='nav-links__link'>Tableaux</a>
        </Link>
        <Link href='https://opendata.bordeaux-metropole.fr/explore/dataset/pc_carf_p/information/'>
          <a className='nav-links__link' target='_blank'>
            OpenData
          </a>
        </Link>
        {user.admin && (
          <Link href='/admin'>
            <a className='nav-links__link text-red-400'>Admin</a>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
