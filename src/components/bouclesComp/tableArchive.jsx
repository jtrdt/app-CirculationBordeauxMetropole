import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

const TableBoucleArchive = () => {
  const [dataCarf, setDataCarf] = useState();
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
            <div className='shadow overflow-hidden border-b border-gray-200 rounded-md'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
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
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      archivé le
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {dataCarf.map(
                    carf =>
                      carf.isStored && (
                        <tr
                          key={carf._id}
                          className='odd:bg-white bg-gray-100 hover:bg-indigo-50 h-9'
                        >
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
                                {moment(carf.recommissioning.date).format('LL')}
                                <div className='text-gray-500 text-xs leading-none'>
                                  par {carf.recommissioning.by.name}
                                </div>
                              </div>
                            )}
                          </td>
                          <td className='px-6 py-1 whitespace-nowrap'>
                            {moment(carf.isStored.date).format('LL')}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBoucleArchive;
