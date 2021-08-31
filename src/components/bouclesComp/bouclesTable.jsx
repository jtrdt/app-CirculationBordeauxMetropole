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
import BoucleAddComment from '../../components/bouclesComp/boucleAddComment.jsx';
import UserContext from '../../contexts/userContext';
import BoucleEditForm from './boucleEditForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className='flex justify-between pb-2'>
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
  // const data = useMemo(() => props.data, []);
  const [data, setData] = useState([]);
  const events = useMemo(() => props.events, []);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState();
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
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
        Header: 'date',
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
        Header: 'libellée',
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
          return (
            <div
              className='text-left cursor-pointer'
              onClick={() => editBoucle(boucles.row.values._id)}
            >
              {boucles.cell.value}
            </div>
          );
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
        Header: 'chantier',
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

  const fetchData = async () => {
    const resBoucles = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boucles`
    );
    const boucles = await resBoucles.json();
    setData(boucles);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boucles/${id[i]}/send`,
        {
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
        }
      );
      if (res.status === 200) {
        fetchData();
        notifyUpdate();
      }
    }
  };

  const recommissioning = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = selectedFlatRows.map(d => {
      return d.original._id;
    });
    for (let i = 0; i < id.length; i++) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boucles/${id[i]}/recommissioning`,
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
      if (res.status === 200) {
        fetchData();
        notifyUpdate();
      }
    }
  };

  const archiveBoucle = async e => {
    e.stopPropagation();
    const userToken = sessionStorage.getItem('user');
    const id = selectedFlatRows.map(d => {
      return d.original._id;
    });
    for (let i = 0; i < id.length; i++) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boucles/${id[i]}/archive`,
        {
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
        }
      );
      if (res.status === 200) {
        fetchData();
        notifyArchive();
      }
    }
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boucles/${id[i]}/urgent`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify({
            isUrgent: !urgent[i]
          })
        }
      );
      if (res.status === 200) {
        fetchData();
        notifyUpdate();
      }
    }
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boucles/${id[i]}/precise`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify({
            isUrgent: !precise[i]
          })
        }
      );
      if (res.status === 200) {
        fetchData();
        notifyUpdate();
      }
    }
  };

  const updateEvent = async e => {
    e.preventDefault();
    const eventId = e.target.value;
    const userToken = sessionStorage.getItem('user');
    const id = selectedFlatRows.map(d => {
      return d.original._id;
    });
    for (let i = 0; i < id.length; i++) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boucles/${id[i]}/event`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`
          },
          body: JSON.stringify({
            eventId
          })
        }
      );
      if (res.status === 200) {
        fetchData();
        notifyUpdate();
      }
    }
  };

  const editBoucle = id => {
    setShowEditForm(true);
    setEditId(id);
  };

  const notifyUpdate = () => toast('Mise à jour effectuée avec succès');
  const notifyArchive = () => toast('Données archivées avec succès');

  if (isLoading) {
    return <div>Changement en cours...</div>;
  }

  if (data.length === 0) {
    return (
      <div className='flex flex-col'>
        {user ? (
          <button
            className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
            onClick={handleOpenForm}
          >
            Ajouter une nouvelle boucle
          </button>
        ) : null}
        <ReactModal
          isOpen={showForm}
          onRequestClose={handleCloseForm}
          shouldFocusAfterRender={false}
          ariaHideApp={false}
          style={{
            content: {
              position: 'relative',
              top: '2vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '700px',
              border: 'none',
              background: 'none',
              maxHeight: '80vh'
            }
          }}
        >
          <BoucleForm />
        </ReactModal>
        No data
      </div>
    );
  }

  return (
    <div>
      <div className='flex justify-between'>
        {user ? (
          <button
            className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
            onClick={handleOpenForm}
          >
            Ajouter une nouvelle boucle
          </button>
        ) : null}
        <ReactModal
          isOpen={showForm}
          onRequestClose={handleCloseForm}
          shouldFocusAfterRender={false}
          ariaHideApp={false}
          style={{
            content: {
              position: 'relative',
              top: '2vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '700px',
              border: 'none',
              background: 'none',
              maxHeight: '80vh'
            }
          }}
        >
          <BoucleForm />
        </ReactModal>
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
                {...row.getRowProps()}
                className='hover:bg-yellow-50 bg-yellow-100'
                style={{ backgroundColor: `${bgEvent()}` }}
              >
                {row.cells.map(cell => {
                  if (cell.column.Header === 'commentaire') {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className='px-2 border border-gray-500 leading-5 text-center w-full'
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
          Page{' '}
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
          {[10, 25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      {user.role === 'admin' ? (
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
          onClick={setToPrecise}
        >
          À préciser
        </button>
      ) : null}
      {user.role === 'admin' ? (
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
          onClick={setUrgent}
        >
          Urgent
        </button>
      ) : null}
      {user.role === 'admin' ? (
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
          onClick={archiveBoucle}
        >
          Archiver
        </button>
      ) : null}
      {user.role === 'admin' ? (
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
          onClick={sendBoucle}
        >
          Transmettre
        </button>
      ) : null}
      {user ? (
        <button
          className='p-1 border my-2 bg-gray-200 hover:bg-gray-300 mr-2'
          onClick={recommissioning}
        >
          Remettre en service
        </button>
      ) : null}
      {user.role === 'admin' ? (
        <form>
          <select
            className='p-1 border my-2 bg-gray-200 hover:bg-gray-300'
            onChange={updateEvent}
          >
            <option value=''>--Ajouter un chantier en cours--</option>
            {/* random value pour null */}
            <option value='610e8d5ff4e9391e41b72f1e'>
              Aucun chantier en cours
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
            top: '2vh',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            border: 'none',
            background: 'none',
            maxHeight: '80vh'
          }
        }}
      >
        {user.role === 'user' ? (
          <BoucleAddComment data={editId} />
        ) : user.role === 'admin' ? (
          <BoucleEditForm data={editId} />
        ) : null}
      </ReactModal>
      <ToastContainer />
    </div>
  );
};

export default BoucleTable;
