import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import ReactModal from 'react-modal';
import moment from 'moment';
import BoucleEditForm from '../bouclesComp/boucleEditForm.jsx';

const TableBoucle = () => {
  const [user, setUser] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dataCarf, setDataCarf] = useState();
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      const decoded = jwt_decode(userToken);
      setUser(decoded.userId);
    }
    fetchData();
  }, [showForm, user]);

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
      // window.location.href = '/auth';
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
    fetchData();
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

  const backInService = async e => {
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
        backInService: {
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
  return (
    <div>
      <table>
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
                {carf.isUrgent && <span>!!!</span>}
                {carf.toPrecise && <span>???</span>}
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
              <td className='border border-black p-1 text-center'>
                {moment(carf.sendedDate).format('DD-MM-YYYY')}
              </td>
              <td className='border border-black p-1 text-center'>
                {carf.backInService && (
                  <span>
                    Remis en service le{' '}
                    {moment(carf.backInService.date).format('DD-MM-YYYY')} par{' '}
                    {carf.backInService.by.name}
                  </span>
                )}
              </td>
              {user && (
                <td>
                  {/* <button
                className='bg-gray-400 border hover:bg-gray-300'
                onClick={props.showEditForm}
              >
                Editer
              </button> */}
                  {carf.sendedDate ? null : (
                    <button className='btn' onClick={sendBoucle} id={carf._id}>
                      Marquer transmis
                    </button>
                  )}
                  {carf.backInService ? null : (
                    <button
                      className='btn'
                      onClick={backInService}
                      id={carf._id}
                    >
                      Remettre en service
                    </button>
                  )}
                  {carf.isStored ? null : (
                    <button className='btn' onClick={storeBoucle} id={carf._id}>
                      Archiver
                    </button>
                  )}
                </td>
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
        <p>Ajoutez une nouvelle boucle coupée</p>
        <BoucleEditForm editedBoucleId={targetId} closeForm={handleCloseForm} />
        <button onClick={handleCloseForm}>Fermer</button>
      </ReactModal>
    </div>
  );
};
export default TableBoucle;
