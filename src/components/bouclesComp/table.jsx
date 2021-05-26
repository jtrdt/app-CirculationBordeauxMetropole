import React, { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';
import BoucleEditForm from '../bouclesComp/boucleEditForm.jsx';
import TimeLine from './timeline.jsx';
import UserContext from '../../contexts/userContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const TableBoucle = () => {
  const [dataCarf, setDataCarf] = useState();
  const [showForm, setShowForm] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userToken = sessionStorage.getItem('user');
    const res = await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });

    const data = await res.json();
    setDataCarf(data);
    if (res.status === 401) {
      window.location.href = '/';
      sessionStorage.removeItem('user');
    }
  };

  const handleOpenForm = () => {
    if (user) {
      setShowForm(true);
    }
  };

  const handleCloseForm = e => {
    e.stopPropagation();
    setShowForm(false);
    setTargetId();
  };

  /*   const onSort = () => {
    const newData = [...dataCarf];
    newData.sort((a, b) => {
      if (a.postedBy.name < b.postedBy.name) {
        return -1;
      }
      if (a.postedBy.name > b.postedBy.name) {
        return 1;
      }
      return 0;
    });
    setDataCarf(newData);
  }; */

  const sendBoucle = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id}/send`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        sendedDate: Date.now()
      })
    });
    fetchData();
  };

  const recommissioning = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id}/recommissioning`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        recommissioning: {
          date: Date.now(),
          by: user.userId
        }
      })
    });
    fetchData();
  };

  const storeBoucle = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id}/archive`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        isStored: {
          date: Date.now(),
          by: user.userId
        }
      })
    });
    fetchData();
  };

  if (!dataCarf) {
    return <div>Chargement...</div>;
  }
  if (dataCarf.length === 0) {
    return <div>Pas de data</div>;
  }
  return (
    <div>
      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='pb-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 rounded-tl-none rounded-tr-md rounded-b-md'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      <span className='sr-only'>alerts</span>
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      date
                    </th>
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
                      z+c
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      nature
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      entrée
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      libellée
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      commentaire
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      transmis le
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      remise en service
                    </th>
                    {user && (
                      <th scope='col' className='relative py-1'>
                        <span className='sr-only'>Edit</span>
                      </th>
                    )}
                    <th
                      scope='col'
                      className='px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    ></th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {dataCarf.map(
                    carf =>
                      !carf.isStored && (
                        <tr
                          key={carf._id}
                          className='odd:bg-white bg-gray-100 hover:bg-indigo-50 h-9'
                          onClick={() => {
                            setTargetId(carf._id);
                            handleOpenForm();
                          }}
                        >
                          <td className='px-4 py-1 whitespace-nowrap'>
                            {carf.isUrgent && (
                              <FontAwesomeIcon icon={faExclamationTriangle} />
                            )}
                            {carf.toPrecise && (
                              <FontAwesomeIcon icon={faInfoCircle} />
                            )}
                          </td>
                          <td className='px-6 py-1 whitespace-nowrap'>
                            {moment(carf.createdAt).format('LL')}
                          </td>
                          <td className='px-6 py-1 whitespace-nowrap'>
                            {carf.postedBy.name}
                          </td>
                          <td className='px-6 py-1 whitespace-nowrap'>
                            {carf.carfId}
                          </td>
                          <td className='px-6 py-1 whitespace-nowrap'>
                            {carf.nature}
                          </td>
                          <td className='px-6 py-1 whitespace-nowrap'>
                            {carf.entry}
                          </td>
                          <td className='px-6 py-1 whitespace-nowrap'>
                            {carf.label}
                          </td>
                          <td className='px-6 py-1 whitespace-nowrap'>
                            {carf.comment}
                          </td>
                          <td className='px-6 py-1 whitespace-nowrap'>
                            {carf.sendedDate && (
                              <div>{moment(carf.sendedDate).format('LL')}</div>
                            )}
                          </td>
                          <td className='px-6 whitespace-nowrap'>
                            {carf.recommissioning && (
                              <div className='leading-tight'>
                                {moment(carf.recommissioning.date).format('LL')}{' '}
                                <div className='text-gray-500 text-xs leading-none'>
                                  par {carf.recommissioning.by.name}
                                </div>
                              </div>
                            )}
                          </td>
                          {user && (
                            <td className='grid whitespace-nowrap text-center text-sm font-medium'>
                              {user.role === 'admin' ? (
                                carf.sendedDate ? null : (
                                  <a
                                    className='text-red-600 hover:text-indigo-900 cursor-pointer'
                                    onClick={sendBoucle}
                                    id={carf._id}
                                  >
                                    Marquer transmis aujourd'hui
                                  </a>
                                )
                              ) : null}
                              {carf.recommissioning ? null : (
                                <a
                                  className='text-indigo-600 hover:text-indigo-900 cursor-pointer'
                                  onClick={recommissioning}
                                  id={carf._id}
                                >
                                  Remettre en service
                                </a>
                              )}
                              {!carf.isStored && user.role === 'admin' ? (
                                <a
                                  className='text-red-600 hover:text-indigo-900 cursor-pointer'
                                  onClick={storeBoucle}
                                  id={carf._id}
                                >
                                  Archiver
                                </a>
                              ) : null}
                            </td>
                          )}
                          {carf.sendedDate && !carf.recommissioning ? (
                            <TimeLine sendedDate={carf.sendedDate} />
                          ) : (
                            <td className='px-6 py-1 whitespace-nowrap'></td>
                          )}
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={showForm}
        onRequestClose={handleCloseForm}
        shouldFocusAfterRender={false}
        ariaHideApp={false}
        style={{
          content: {
            position: 'relative',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            padding: 0,
            borderRadius: '6px',
            backgroundColor: 'white'
          }
        }}
      >
        <BoucleEditForm editedBoucleId={targetId} closeForm={handleCloseForm} />
      </ReactModal>
    </div>
  );
};

export default TableBoucle;
