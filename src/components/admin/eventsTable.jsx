import { format, parseISO } from 'date-fns';
import React, { useMemo, useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from 'react-table';
import EventEditForm from './editEventForm';
import ReactModal from 'react-modal';

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
  // const data = useMemo(() => props.data, []);
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const columns = useMemo(
    () => [
      {
        Header: 'chantier',
        accessor: 'title'
      },
      {
        Header: 'Couleur',
        accessor: 'color'
      },
      {
        Header: 'Date de début',
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userToken = sessionStorage.getItem('user');
    const resEvents = await fetch(`${process.env.NEXT_PUBLIC_EVENT_URL}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    const dataEvents = await resEvents.json();
    setData(dataEvents);
    setIsLoading(false);
    if (resEvents.status === 403) {
      window.location.href = '/';
      sessionStorage.removeItem('user');
    }
  };

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

  const editEvent = id => {
    setShowEditForm(true);
    setEditId(id);
  };

  if (isLoading || !data.length) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className='flex justify-between mb-2'>
        <div>
          <h3 className='uppercase text-xl'>Liste des chantiers</h3>
          <p className='text-sm'>Cliquez sur un chantier pour le modifier</p>
        </div>
        <GlobalFilter setGlobalFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className='border border-blue-500'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className='px-6 py-3 text-left text-xs bg-white font-medium text-gray-500 uppercase tracking-wider'
                >
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
                  style={{ backgroundColor: `${bg}` }}
                >
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className='px-2 border border-gray-500 leading-5 text-center'
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            }
            return (
              <tr
                onClick={() => editEvent(row.original._id)}
                {...row.getRowProps()}
                className='bg bg-yellow-100 hover:bg-yellow-50'
              >
                {row.cells.map(cell => {
                  if (cell.column.id === 'color') {
                    const bg = cell.value;
                    return (
                      <td
                        {...cell.getCellProps()}
                        className='px-2 border border-gray-500 leading-5 text-center'
                        style={{ backgroundColor: `${bg}` }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      className='px-2 border border-gray-500 leading-5 text-center'
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
      <div>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className='p-1 border m-2 ml-0 bg-gray-200 hover:bg-gray-300 disabled:opacity-50'
        >
          Précédent
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className='p-1 border mt-2 ml-0 bg-gray-200 hover:bg-gray-300 disabled:opacity-50'
        >
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
          }}
        >
          {[10, 20, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <ReactModal
        isOpen={showEditForm}
        onRequestClose={() => setShowEditForm(false)}
        shouldFocusAfterRender={false}
        ariaHideApp={false}
        style={{
          content: {
            position: 'relative',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            border: 'none',
            background: 'none'
          }
        }}
      >
        <EventEditForm data={editId} />
      </ReactModal>
    </div>
  );
};

export default EventsTable;
