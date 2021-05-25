import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const TableAdmin = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userToken = sessionStorage.getItem('user');
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_URL}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    const data = await res.json();
    setUserData(data);
    if (res.status === 401) {
      window.location.href = '/';
      sessionStorage.removeItem('user');
    }
  };

  const updateRoleUser = async e => {
    const userToken = sessionStorage.getItem('user');
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_USER_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        role: 'user'
      })
    });
    fetchData();
  };

  const updateRoleModerator = async e => {
    const userToken = sessionStorage.getItem('user');
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_USER_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        role: 'moderator'
      })
    });
    fetchData();
  };

  const deleteUser = async e => {
    const userToken = sessionStorage.getItem('user');
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_USER_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
    });
    fetchData();
  };

  if (!userData) {
    return <div>Chargement...</div>;
  }
  if (userData.length === 0) {
    return <div>Pas de data</div>;
  }
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    nom
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    inscrit le
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    rôle
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {userData.map(user => (
                  <tr
                    key={user.email}
                    className={'odd:bg-white bg-gray-100 hover:bg-indigo-50'}
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10'>
                          <FontAwesomeIcon
                            icon={faUserCircle}
                            className='mr-2'
                            size='2x'
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            {user.name}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-500'>
                        {moment(user.createdAt).format('LL')}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {user.role === 'admin' ? (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                          {user.role}
                        </span>
                      ) : user.role === 'moderator' ? (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                          {user.role}
                        </span>
                      ) : (
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      {user.role === 'admin' ? null : (
                        <span>
                          {user.role === 'moderator' ? (
                            <a
                              onClick={updateRoleUser}
                              id={user._id}
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900 mr-2'
                            >
                              Passer user
                            </a>
                          ) : (
                            <a
                              onClick={updateRoleModerator}
                              id={user._id}
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900 mr-2'
                            >
                              Passer moderateur
                            </a>
                          )}
                          <a
                            onClick={deleteUser}
                            id={user._id}
                            href='#'
                            className='text-red-600 hover:text-indigo-900'
                          >
                            Supprimer
                          </a>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAdmin;
