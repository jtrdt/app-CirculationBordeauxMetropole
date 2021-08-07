import React, { useMemo, useEffect, useState, useRef, forwardRef } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import {
  useSortBy,
  useTable,
  usePagination,
  useRowSelect,
  useAsyncDebounce,
  useGlobalFilter
} from 'react-table';
import { format, parseISO } from 'date-fns';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;
  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
  return (
    <>
      <input type='checkbox' ref={resolvedRef} {...rest} />
    </>
  );
});

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <div>
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder='Rechercher'
        className='w-25 px-2 mb-2'
      />
    </div>
  );
};

const BoucleTable = boucles => {
  const data = useMemo(() => boucles.data, []);
  if (data.length === 0) {
    return <div>No data</div>;
  }

  const columns = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'carfId'
      },
      {
        Header: 'nom',
        accessor: 'postedBy.username'
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
        Header: 'crée le',
        accessor: boucles => {
          const date = format(parseISO(boucles.createdAt), 'dd LLL yyyy');
          return <div className='w-24'>{date}</div>;
        }
      },
      {
        Header: 'commentaire',
        accessor: boucles => {
          return <div className='text-left'>{boucles.comment}</div>;
        }
      },
      {
        Header: 'transmis le',
        accessor: boucles => {
          if (boucles.sendedDate === undefined) {
            return <div>n/a</div>;
          } else {
            const date = format(
              parseISO(boucles.sendedDate.date),
              'dd LLL yyyy'
            );
            return (
              <div className='w-20 text-left'>
                {date} <br />
                <span className='text-gray-500 text-sm'>
                  par {boucles.sendedDate.by.username}
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
          } else return format(parseISO(d.recommissioning.date), 'dd LLL yyyy');
        }
      },
      {
        Header: 'event',
        accessor: 'event.title'
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    selectedFlatRows,
    setGlobalFilter
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )
        },
        ...columns
      ]);
    }
  );
  console.log(selectedFlatRows);
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
          {page.map((row, i) => {
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
          Page{' '}
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

export default BoucleTable;
