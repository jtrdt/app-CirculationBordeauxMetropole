import React from 'react';
import { useTable } from 'react-table';

const BoucleTable = (boucleData) => {
  const data = React.useMemo(() => boucleData.data, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'alerte',
        accessor: 'alert' // accessor is the "key" in the data
      },
      {
        Header: 'date',
        accessor: 'date'
      },
      {
        Header: 'posted by',
        accessor: 'postedBy'
      },
      {
        Header: 'zone',
        accessor: 'zone'
      },
      {
        Header: 'carrefour',
        accessor: 'crossroad'
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
        accessor: 'col9'
      },
      {
        Header: 'icone feu',
        accessor: 'col10'
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

  console.log(boucleData);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BoucleTable;
