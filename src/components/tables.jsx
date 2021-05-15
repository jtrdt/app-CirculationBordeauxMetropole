import React, { useState } from 'react';
import Table from './bouclesComp/table';

const Tables = props => {
  const [table, setTable] = useState(1);

  return (
    <div className='m-2'>
      <nav>
        <button
          className={
            table === 1
              ? 'p-2 bg-gray-300 border-black border'
              : 'p-2 bg-gray-100 border-black border hover:bg-gray-300'
          }
          onClick={() => setTable(1)}
        >
          Boucles ({props.data.length})
        </button>
        <button
          className={
            table === 2
              ? 'p-2 bg-gray-300 border-black border'
              : 'p-2 bg-gray-100 border-black border hover:bg-gray-300'
          }
          onClick={() => setTable(2)}
        >
          Capteurs (123)
        </button>
        <button
          className={
            table === 3
              ? 'p-2 bg-gray-300 border-black border'
              : 'p-2 bg-gray-100 border-black border hover:bg-gray-300'
          }
          onClick={() => setTable(3)}
        >
          Siredos (123)
        </button>
      </nav>
      <div className='border'>
        {table === 1 && (
          <div>
            <p className='text-white'>Tableau des boules coupés</p>
            <Table data={props.data} />
          </div>
        )}
        {table === 2 && (
          <p className='text-white'>Tableau des capteurs hs</p>
        )}
        {table === 3 && <p className='text-white'>Tableau des siredo hs</p>}
      </div>
    </div>
  );
};

export default Tables;
