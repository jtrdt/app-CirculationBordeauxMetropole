import { format, parseISO } from 'date-fns';
import React, { useMemo, useState } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table';

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <input
      value={value || ''}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder='Rechercher'
      className='w-40 px-2 my-auto h-7'
    />
  );
};

const EventsTable = props => {
  const data = useMemo(() => props.data.data, []);
  const columns = useMemo(
    () => [
      {
        Header: 'inscription',
        accessor: 'createdAt',
        Cell: boucles => {
          const date = format(parseISO(boucles.cell.value), 'yyyy LLL dd');
          return <div className='w-28'>{date}</div>;
        }
      },
      {
        Header: 'nom',
        accessor: 'lastname',
        Cell: user => {
          return <span className='uppercase'>{user.value}</span>;
        }
      },
      {
        Header: 'prénom',
        accessor: 'firstname',
        Cell: user => {
          return <span className='capitalize'>{user.value}</span>;
        }
      },
      {
        Header: 'username',
        accessor: 'username'
      },
      {
        Header: 'rôle',
        accessor: 'role',
        Cell: user => {
          return (
            <>
              {user.value === 'admin' ? (
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                  {user.value}
                </span>
              ) : user.value === 'moderator' ? (
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                  {user.value}
                </span>
              ) : (
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                  {user.value}
                </span>
              )}
            </>
          );
        }
      },
      {
        Header: 'email',
        accessor: 'email'
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'role',
            desc: false
          }
        ]
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div>
      <div className='flex justify-between mb-2'>
        <h3 className='uppercase text-xl'>Liste des utilisateurs</h3>
        <GlobalFilter setGlobalFilter={setGlobalFilter} />
      </div>

      <table {...getTableProps()} className='border border-blue-500'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  // className='border-b-4 border-red-500 bg-blue-200 px-7'
                  className='px-6 py-3 text-left text-xs font-medium bg-white text-gray-500 uppercase tracking-wider'>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className='bg bg-yellow-100 hover:bg-yellow-50'>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className='px-2 border border-gray-500 leading-5 text-center'>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className='p-1 border m-2 ml-0 bg-gray-200 hover:bg-gray-300 disabled:opacity-50'>
          Précédent
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className='p-1 border mt-2 ml-0 bg-gray-200 hover:bg-gray-300 disabled:opacity-50'>
          Suivant
        </button>
        <div>
          Page
          <span>
            {pageIndex + 1} sur {pageOptions.length}
          </span>
        </div>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EventsTable;
