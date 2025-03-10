import Link from 'next/link';
import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';

import UserContext from '../../contexts/userContext.jsx';

const NavBar = () => {
  const user = useContext(UserContext);

  const logout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className='hello navbar flex justify-between py-2 px-10 bg-transparent-bar'>
      {user.userName && (
        <div className='flex flex-col justify-around items-start text-lg'>
          <h3 className='text-gray-600 font-medium'>
            Bonjour{' '}
            <a href='/user' className='hover:underline capitalize font-normal'>
              {user.userFirstname}
            </a>
          </h3>
          <div className='line w-32 h-0.5 my-1'></div>
          <a
            className='lowercase font-normal text-sm pb-1 hover:text-gray-800 cursor-pointer'
            onClick={logout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
            se déconnecter
          </a>
        </div>
      )}
      <nav className='my-auto mx-0'>
        {!user && (
          <Link href='/'>
            <a className='nav-links__link'>Accueil</a>
          </Link>
        )}
        {user && (
          <Link href='/boucle'>
            <a className='nav-links__link'>Tableaux</a>
          </Link>
        )}
        {user && (
          <Link href='/boucle/archive'>
            <a className='nav-links__link'>Archives</a>
          </Link>
        )}
        <Link href='https://opendata.bordeaux-metropole.fr/explore/dataset/pc_carf_p/table/'>
          <a className='nav-links__link' target='_blank' rel='noreferrer'>
            OpenData
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              size='xs'
              className='ml-2 text-gray-400'
            />
          </a>
        </Link>
        <Link href='https://twitter.com/CirculationBxM'>
          <a className='nav-links__link' target='_blank' rel='noreferrer'>
            Twitter Circulation
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              size='xs'
              className='ml-2 text-gray-400'
            />
          </a>
        </Link>
        {user.role === 'admin' && (
          <Link href='/admin'>
            <a className='nav-links__link text-red-600'>Admin</a>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
