import React from 'react';

const Table = props => {
  const sendBoucle = async e => {
    const id = e.target.id;
    console.log(e.target);
    await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sendedDate: Date.now()
      })
    });
  };

  const backInService = async e => {
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
  };

  const storeBoucle = async e => {
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
  };

  return (
    <table>
      <thead className='m-0 sticky top-0'>
        <tr>
          <th className='border border-black bg-gray-300 p-1'></th>
          <th className='border border-black bg-gray-300 p-1'>date</th>
          <th className='border border-black bg-gray-300 p-1'>nom</th>
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
        {props.data.map(carf => (
          <tr
            key={carf._id}
            className={
              carf.isStored
                ? 'bg-purple-200 hover:bg-indigo-50'
                : 'odd:bg-white bg-gray-100 hover:bg-indigo-50'
            }
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
              <button
                className='bg-gray-400 border hover:bg-gray-300'
                onClick={sendBoucle}
                id={carf._id}
              >
                Marquer transmis
              </button>
              {carf.backInService ? (
                <button
                  className='bg-gray-400 border hover:bg-gray-300'
                  onClick={storeBoucle}
                  id={carf._id}
                >
                  Archiver
                </button>
              ) : (
                <button
                  className='bg-gray-400 border hover:bg-gray-300'
                  onClick={backInService}
                  id={carf._id}
                >
                  Remis en service
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
