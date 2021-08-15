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
  const data = useMemo(() => props.data, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Évenement',
        accessor: 'title'
      },
      {
        Header: 'Couleur',
        accessor: 'color'
      },
      {
        Header: 'Date début',
        accessor: 'startDate',
        Cell: event => {
          if (event.value === undefined) {
            return <div>n/a</div>;
          }
          const date = format(parseISO(event.value), 'yyyy LLL dd');
          return <div>{date}</div>;
        }
      },
      {
        Header: 'Date de fin',
        accessor: 'endDate',
        Cell: event => {
          if (event.value === undefined) {
            return <div>n/a</div>;
          }
          const date = format(parseISO(event.value), 'yyyy LLL dd');
          return <div>{date}</div>;
        }
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
        <h3 className='uppercase text-xl'>Liste des événements</h3>
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
                  className='px-6 py-3 text-left text-xs bg-white font-medium text-gray-500 uppercase tracking-wider'>
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
            if (row.original.event) {
              const bg = row.original.event.color;
              return (
                <tr
                  {...row.getRowProps()}
                  className='bg bg-yellow-100 hover:bg-yellow-50'
                  style={{ backgroundColor: `${bg}` }}>
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
            }
            return (
              <tr
                {...row.getRowProps()}
                className='bg bg-yellow-100 hover:bg-yellow-50'>
                {row.cells.map(cell => {
                  if (cell.column.id === 'color') {
                    const bg = cell.value;
                    return (
                      <td
                        {...cell.getCellProps()}
                        className='px-2 border border-gray-500 leading-5 text-center'
                        style={{ backgroundColor: `${bg}` }}>
                        {cell.render('Cell')}
                      </td>
                    );
                  }
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
          className='p-1 border m-2 ml-0 bg-gray-200 hover:bg-gray-300'>
          Précédent
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className='p-1 border mt-2 ml-0 bg-gray-200 hover:bg-gray-300'>
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
