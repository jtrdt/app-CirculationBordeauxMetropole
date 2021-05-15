import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import ReactModal from 'react-modal';
import moment from 'moment';
import BoucleEditForm from '../bouclesComp/boucleEditForm.jsx';
import TimeLine from './timeline.jsx';

const TableBoucle = () => {
  const [dataCarf, setDataCarf] = useState();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    fetchData();
    userLogged();
  }, [showForm]);

  const userLogged = async () => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      const decoded = jwt_decode(userToken);
      setUser(decoded.userId);
      setIsAdmin(decoded.admin);
    }
  };

  const fetchData = async () => {
    const userToken = localStorage.getItem('user');
    const res = await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });

    const data = await res.json();
    setDataCarf(data);
    if (res.status === 401) {
      window.location.href = '/auth';
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
    const userToken = localStorage.getItem('user');
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id}`, {
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
    const userToken = localStorage.getItem('user');
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
          by: user
        }
      })
    });
    fetchData();
  };

  const storeBoucle = async e => {
    e.stopPropagation();
    const userToken = localStorage.getItem('user');
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        isStored: {
          date: Date.now(),
          by: user
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
      <table className='w-full'>
        <thead>
          <tr>
            <th className='border border-black bg-gray-300 p-1'></th>
            <th className='border border-black bg-gray-300 p-1'>date</th>
            <th
              className='border border-black bg-gray-300 p-1'
              // onClick={() => onSort('postedBy.name')}
            >
              nom
            </th>
            <th className='border border-black bg-gray-300 p-1'>z+c</th>
            <th className='border border-black bg-gray-300 p-1'>nature</th>
            <th className='border border-black bg-gray-300 p-1'>entrée</th>
            <th className='border border-black bg-gray-300 p-1'>libellée</th>
            <th className='border border-black bg-gray-300 p-1'>commentaire</th>
            <th className='border border-black bg-gray-300 p-1'>transmis le</th>
            <th className='border border-black bg-gray-300 p-1'>
              remis en service le
            </th>
            <th className='border border-black bg-gray-300 p-1'>par</th>

            {user && <th className='border border-black bg-gray-300 p-1'></th>}
          </tr>
        </thead>
        <tbody>
          {dataCarf.map(carf => (
            <tr
              key={carf._id}
              className={
                carf.isStored
                  ? 'bg-purple-200 hover:bg-indigo-200'
                  : 'odd:bg-white bg-gray-100 hover:bg-indigo-50'
              }
              onClick={() => {
                setTargetId(carf._id);
                handleOpenForm();
              }}
            >
              <td className='border border-black p-1 text-center'>
                {carf.isUrgent && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 0 24 24'
                    width='24px'
                    fill='#000000'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path d='M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z' />
                  </svg>
                )}
                {carf.toPrecise && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 0 24 24'
                    width='24px'
                    fill='#000000'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path d='M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z' />
                  </svg>
                )}
              </td>
              <td className='border border-black p-1 text-center'>
                {moment(carf.createdAt).format('DD-MM-YYYY')}
              </td>
              <td className='border border-black p-1 text-center'>
                {carf.postedBy.name}
              </td>
              <td className='border border-black p-1 text-center'>
                {carf.carfId}
              </td>
              <td className='border border-black p-1 text-center'>
                {carf.nature}
              </td>
              <td className='border border-black p-1 text-center'>
                {carf.entry}
              </td>
              <td className='border border-black p-1 text-center'>
                {carf.label}
              </td>
              <td className='border border-black p-1 text-center'>
                {carf.comment}
              </td>
              <td className='border border-black p-1 text-center w-20'>
                {carf.sendedDate &&
                  moment(carf.sendedDate).format('DD-MM-YYYY')}
              </td>
              <td className='border border-black p-1 text-center'>
                {carf.recommissioning && (
                  <span>
                    {moment(carf.recommissioning.date).format('DD-MM-YYYY')}{' '}
                  </span>
                )}
              </td>
              <td className='border border-black p-1 text-center w-20'>
                {carf.recommissioning && (
                  <span>{carf.recommissioning.by.name}</span>
                )}
              </td>
              {user && (
                <td className='border border-black p-1 text-center'>
                  {/* <button
                className='bg-gray-400 border hover:bg-gray-300'
                onClick={props.showEditForm}
              >
                Editer
              </button> */}
                  {isAdmin ? (
                    carf.sendedDate ? null : (
                      <button
                        className='btn'
                        onClick={sendBoucle}
                        id={carf._id}
                      >
                        Marquer transmis aujourd'hui
                      </button>
                    )
                  ) : null}
                  {carf.recommissioning ? null : (
                    <button
                      className='btn'
                      onClick={recommissioning}
                      id={carf._id}
                    >
                      Remettre en service
                    </button>
                  )}
                  {isAdmin ? (
                    <button className='btn' onClick={storeBoucle} id={carf._id}>
                      Archiver
                    </button>
                  ) : null}
                </td>
              )}
              {carf.recommissioning ? (
                <td className='border border-black p-1 text-center w-20'></td>
              ) : (
                <TimeLine sendedDate={carf.sendedDate} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
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
            width: '700px'
          }
        }}
      >
        <p>Edit form</p>
        <BoucleEditForm editedBoucleId={targetId} closeForm={handleCloseForm} />
        <button onClick={handleCloseForm}>Fermer</button>
      </ReactModal>
    </div>
  );
};

export default TableBoucle;
