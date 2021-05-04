import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import BoucleEditForm from '../bouclesComp/boucleEditForm.jsx';

const TableBoucle = props => {
  const [dataCarf, setDataCarf] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [targetId, setTargetId] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}`);
    const data = await res.json();
    setDataCarf(data);
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = e => {
    e.stopPropagation();
    setShowForm(false);
    setTargetId();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [showForm]);

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
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sendedDate: Date.now()
      })
    });
    fetchData();
  };

  const backInService = async e => {
    e.stopPropagation();
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        backInService: {
          date: Date.now(),
          by: '60759e92b67c11354d8c5cfd' // à automatiser
        }
      })
    });
    fetchData();
  };

  const storeBoucle = async e => {
    e.stopPropagation();
    const id = e.target.id;
    await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isStored: {
          date: Date.now(),
          by: '6075849ab67c11354d8c5cfb'
        }
      })
    });
    fetchData();
  };

  return (
    <div>
      <table>
        <thead className='m-0 sticky top-0'>
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
            <th className='border border-black bg-gray-300 p-1'></th>
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
                {carf.createdAt}
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
                {carf.sendedDate}
              </td>
              <td className='border border-black p-1 text-center'>
                {carf.backInService && (
                  <span>
                    Remis en service le {carf.backInService.date} par{' '}
                    {carf.backInService.by.name}
                  </span>
                )}
              </td>
              <td>
                {/* <button
                className='bg-gray-400 border hover:bg-gray-300'
                onClick={props.showEditForm}
              >
                Editer
              </button> */}
                {carf.sendedDate ? null : (
                  <button
                    className='bg-gray-400 border hover:bg-gray-300'
                    onClick={sendBoucle}
                    id={carf._id}
                  >
                    Marquer transmis
                  </button>
                )}
                {carf.backInService ? null : (
                  <button
                    className='bg-gray-400 border hover:bg-gray-300'
                    onClick={backInService}
                    id={carf._id}
                  >
                    Remettre en service
                  </button>
                )}
                {carf.isStored ? null : (
                  <button
                    className='bg-gray-400 border hover:bg-gray-300'
                    onClick={storeBoucle}
                    id={carf._id}
                  >
                    Archiver
                  </button>
                )}
              </td>
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
