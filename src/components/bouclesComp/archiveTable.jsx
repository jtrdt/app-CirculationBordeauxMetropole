import React, { useMemo, useState } from 'react';
import { parseISO } from 'date-fns';
import format from 'date-fns/format';
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

const ArchiveTable = props => {
  const data = useMemo(() => props.data.archives, []);
  const columns = React.useMemo(
    () => [
      {
        Header: 'crée le',
        accessor: 'createdAt',
        Cell: boucles => {
          const date = format(parseISO(boucles.cell.value), 'yyyy LLL dd');
          return <div className='w-28'>{date}</div>;
        }
      },
      {
        Header: 'nom',
        accessor: 'postedBy.username'
      },
      {
        Header: 'ident',
        accessor: 'carfId'
      },
      {
        Header: 'nature',
        accessor: 'nature'
      },
      {
        Header: 'label',
        accessor: 'label'
      },
      {
        Header: 'entrée',
        accessor: 'entry'
      },
      {
        Header: 'commentaire',
        accessor: 'comment',
        Cell: boucles => {
          return <div className='text-left'>{boucles.cell.value}</div>;
        }
      },
      {
        Header: 'transmis le',
        accessor: 'sendedDate',
        Cell: boucles => {
          if (boucles.cell.value === undefined) {
            return <div>n/a</div>;
          } else {
            const date = format(
              parseISO(boucles.cell.value.date),
              'yyyy LLL dd'
            );
            return (
              <div className='w-20 text-left'>
                {date} <br />
                <span className='text-gray-500 text-sm'>
                  par {boucles.cell.value.by.username}
                </span>
              </div>
            );
          }
        }
      },
      {
        Header: 'remise en service',
        accessor: boucles => {
          if (boucles.recommissioning === undefined) {
            return <div>n/a</div>;
          } else
            return format(
              parseISO(boucles.recommissioning.date),
              'dd LLL yyyy'
            );
        }
      },
      {
        Header: 'event',
        accessor: 'event.title'
      },
      {
        Header: 'archivé le',
        accessor: 'archiveBy',
        Cell: boucles => {
          if (boucles.cell.value === undefined) {
            return <div>n/a</div>;
          } else {
            const date = format(
              parseISO(boucles.cell.value.date),
              'yyyy LLL dd'
            );
            return (
              <div className='w-20 text-left'>
                {date} <br />
                <span className='text-gray-500 text-sm'>
                  par {boucles.cell.value.by.username}
                </span>
              </div>
            );
          }
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
            id: 'archiveBy',
            desc: true
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
      <GlobalFilter setGlobalFilter={setGlobalFilter} />

      <table {...getTableProps()} className='border border-blue-500'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className='border-b-4 border-red-500 bg-blue-200 px-7'>
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

export default ArchiveTable;
