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
import BoucleEditForm from '../../components/bouclesComp/boucleEditForm.jsx';
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

const BoucleTable = props => {
  const data = useMemo(() => props.data, []);
  const events = useMemo(() => props.events, []);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState();
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

  const updateEvent = async e => {
    e.preventDefault();
    const eventId = e.target.value;
    const userToken = sessionStorage.getItem('user');
    const id = selectedFlatRows.map(d => {
      return d.original._id;
    });
    for (let i = 0; i < id.length; i++) {
      await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}/${id[i]}/event`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          eventId
        })
      });
    }
    window.location.href = '/boucle';
  };

  const editBoucle = id => {
    setShowEditForm(true);
    setEditId(id);
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
              <div className='w-max'>
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
          const date = format(parseISO(boucles.value), 'yyyy LLL dd');
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
        accessor: 'recommissioning.date',
        Cell: boucles => {
          if (boucles.value === undefined) {
            return <div>n/a</div>;
          } else return format(parseISO(boucles.value), 'dd LLL yyyy');
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
          {page.map((row, i) => {
            prepareRow(row);
            const bgEvent = () => {
              if (
                row.original.event === null ||
                row.original.event === undefined
              ) {
                return '';
              }
              return row.original.event.color;
            };
            return (
              <tr
                onClick={() => editBoucle(row.original._id)}
                {...row.getRowProps()}
                className='hover:bg-yellow-50 bg-yellow-100'
                style={{ backgroundColor: `${bgEvent()}` }}>
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
      {user.role === 'admin' ? (
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
          onClick={setToPrecise}>
          À préciser
        </button>
      ) : null}
      {user.role === 'admin' ? (
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
          onClick={setUrgent}>
          Urgent
        </button>
      ) : null}
      {user.role === 'admin' ? (
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
          onClick={archiveBoucle}>
          Archiver
        </button>
      ) : null}
      {user.role === 'admin' ? (
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
          onClick={sendBoucle}>
          Transmettre
        </button>
      ) : null}
      <button
        className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
        onClick={recommissioning}>
        Remettre en service
      </button>
      {user.role === 'admin' ? (
        <form>
          <select
            className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
            onChange={updateEvent}>
            <option value=''>--Ajouter un évenement en cours--</option>
            {/* random value pour null */}
            <option value='610e8d5ff4e9391e41b72f1e'>
              Aucun gros travaux en cours
            </option>
            {events.map(events => (
              <option value={events._id} key={events._id}>
                {events.title}
              </option>
            ))}
          </select>
        </form>
      ) : null}
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
        }}>
        <BoucleEditForm data={editId} />
      </ReactModal>
    </div>
  );
};

export default BoucleTable;
