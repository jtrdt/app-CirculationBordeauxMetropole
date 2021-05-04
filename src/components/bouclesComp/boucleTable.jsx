import React from 'react';

import { useTable } from 'react-table';

const BoucleTable = boucleData => {
  const data = React.useMemo(() => boucleData.data, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'urgent',
        accessor: 'isUrgent'
      },
      {
        Header: 'à préciser',
        accessor: 'toPrecise'
      },
      {
        Header: 'date',
        accessor: 'createdAt' // changer le format en dd/mm/yyyy
      },
      {
        Header: 'nom',
        accessor: 'postedBy.name'
      },
      {
        Header: 'id carf',
        accessor: 'carfId'
      },
      {
        Header: 'nature',
        accessor: 'nature'
      },
      {
        Header: 'entrée',
        accessor: 'entry'
      },
      {
        Header: 'libellé',
        accessor: 'label'
      },
      {
        Header: 'commentaire',
        accessor: 'comment'
      },
      {
        Header: 'transmis le',
        accessor: 'sendedDate'
      },
      {
        Header: 'boutons',
        accessor: ''
      }
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <table className='border m-2 table-auto' {...getTableProps()}>
      {/* fixer le head (react-window) */}
      <thead className='m-0 p-1'>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                className='border border-black bg-gray-300 p-1'
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr
              className='odd:bg-white bg-gray-100 hover:bg-indigo-50'
              {...row.getRowProps()}
            >
              {row.cells.map(cell => {
                if (cell.column.Header === 'urgent' && cell.value) {
                  return (
                    <td
                      className='border border-black p-1 text-center'
                      {...cell.getCellProps()}
                    >
                      {/* à remplacer par un logo urgent */}
                      <span>/!\</span>
                    </td>
                  );
                }
                if (cell.column.Header === 'à préciser' && cell.value) {
                  return (
                    <td
                      className='border border-black p-1 text-center'
                      {...cell.getCellProps()}
                    >
                      {/* à remplacer par un logo */}
                      ??
                    </td>
                  );
                }
                if (cell.column.Header === 'boutons') {
                  return (
                    <td>
                      <button className='bg-gray-400 border hover:bg-gray-300'>
                        Marquer transmis
                      </button>
                      <button className='bg-gray-400 border hover:bg-gray-300'>
                        Archiver
                      </button>
                      <button className='bg-gray-400 border hover:bg-gray-300'>
                        Remis en service
                      </button>
                    </td>
                  );
                }
                return (
                  <td
                    className='border border-black p-1'
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BoucleTable;
