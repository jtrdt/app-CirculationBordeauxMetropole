import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useContext
} from 'react';
import {
  useSortBy,
  useTable,
  usePagination,
  useRowSelect,
  useAsyncDebounce,
  useGlobalFilter
} from 'react-table';
import { format, parseISO } from 'date-fns';
import regeneratorRuntime from 'regenerator-runtime';
import ReactModal from 'react-modal';
import BoucleForm from './boucleForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../contexts/userContext';

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
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = e => {
    e.stopPropagation();
    setShowForm(false);
  };

  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className='flex justify-between pb-2'>
      <button
        className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
        onClick={handleOpenForm}>
        Ajouter une nouvelle boucle
      </button>
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
            width: '700px',
            border: 'none',
            background: 'none'
          }
        }}>
        <BoucleForm />
      </ReactModal>
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder='Rechercher'
        className='w-40 px-2 my-auto h-7'
      />
    </div>
  );
};

const BoucleTable = boucles => {
  const data = useMemo(() => boucles.data, []);
  const [showForm, setShowForm] = useState(false);
  const user = useContext(UserContext);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = e => {
    e.stopPropagation();
    setShowForm(false);
  };

  const sendBoucle = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = selectedFlatRows.map(d => {
      return d.original._id;
    });
    for (let i = 0; i < id.length; i++) {
      await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id[i]}/send`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          sendedDate: {
            date: Date.now(),
            by: user.userId
          }
        })
      });
    }
    window.location.href = '/boucle';
  };

  const recommissioning = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = selectedFlatRows.map(d => {
      return d.original._id;
    });
    for (let i = 0; i < id.length; i++) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id[i]}/recommissioning`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify({
            recommissioning: {
              date: Date.now(),
              by: user.userId
            }
          })
        }
      );
    }
    window.location.href = '/boucle';
  };

  const archiveBoucle = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = selectedFlatRows.map(d => {
      return d.original._id;
    });
    for (let i = 0; i < id.length; i++) {
      await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id[i]}/archive`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          archiveBy: {
            date: Date.now(),
            by: user.userId
          }
        })
      });
    }
    window.location.href = '/boucle';
  };

  const setUrgent = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = selectedFlatRows.map(d => {
      return d.original._id;
    });
    const urgent = selectedFlatRows.map(d => {
      return d.original.isUrgent;
    });
    for (let i = 0; i < id.length; i++) {
      await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id[i]}/urgent`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          isUrgent: !urgent[i]
        })
      });
    }
    window.location.href = '/boucle';
  };

  const setToPrecise = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = selectedFlatRows.map(d => {
      return d.original._id;
    });
    const precise = selectedFlatRows.map(d => {
      return d.original.toPrecise;
    });
    for (let i = 0; i < id.length; i++) {
      await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id[i]}/precise`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          isUrgent: !precise[i]
        })
      });
    }
    window.location.href = '/boucle';
  };

  const getEventList = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const res = await fetch(`${process.env.NEXT_PUBLIC_EVENT_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    });
    const eventList = await res.json();
    return eventList;
  };

  if (data.length === 0) {
    return (
      <div className='flex flex-col'>
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
          onClick={handleOpenForm}>
          Ajouter une nouvelle boucle
        </button>
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
              width: '700px',
              border: 'none',
              background: 'none'
            }
          }}>
          <BoucleForm />
        </ReactModal>
        No data
      </div>
    );
  }

  const columns = useMemo(
    () => [
      {
        Header: 'id',
        accessor: '_id'
      },
      {
        Header: '',
        accessor: 'isUrgent',
        Cell: boucles => {
          if (
            boucles.cell.row.original.isUrgent &&
            boucles.cell.row.original.toPrecise
          ) {
            return (
              <div>
                <div data-tip='Urgent !' className='tooltip'>
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                </div>
                <div data-tip='À préciser !' className='tooltip'>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </div>
              </div>
            );
          } else if (boucles.cell.row.original.isUrgent) {
            return (
              <div data-tip='Urgent !' className='tooltip'>
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
            );
          } else if (boucles.cell.row.original.toPrecise) {
            return (
              <div data-tip='À préciser !' className='tooltip'>
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
            );
          }
          return <></>;
        }
      },
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
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'createdAt',
            desc: true
          }
        ],
        hiddenColumns: '_id'
      }
    },
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
      <button
        className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
        onClick={setToPrecise}>
        À préciser
      </button>
      <button
        className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
        onClick={setUrgent}>
        Urgent
      </button>
      <button
        className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
        onClick={archiveBoucle}>
        Archiver
      </button>
      <button
        className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
        onClick={sendBoucle}>
        Transmettre
      </button>
      <button
        className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
        onClick={recommissioning}>
        Remettre en service
      </button>
      <select className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'>
        <option value=''>--Please choose an option--</option>
        {/* Liste des event */}
      </select>
    </div>
  );
};

export default BoucleTable;
