import React, { useState } from 'react';
import Table from './bouclesComp/table';

const Tables = props => {
  const [table, setTable] = useState(1);

  return (
    <div>
      <div className='pb-1 flex'>
        <div
          className={
            table === 1
              ? 'cursor-pointer rounded-tl-md bg-white px-5 text-sm font-semibold py-2 border-b-2 border-blue-700'
              : 'cursor-pointer rounded-tl-md bg-white px-5 text-sm py-2 border-b-2 text-gray-400 border-r'
          }
          onClick={() => setTable(1)}
        >
          Boucles ({props.data.length})
        </div>
        <div
          className={
            table === 2
              ? 'cursor-pointer bg-white px-5 text-sm font-semibold py-2 border-b-2 border-blue-700'
              : 'cursor-pointer bg-white px-5 text-sm py-2 border-b-2 text-gray-400 border-r border-l'
          }
          onClick={() => setTable(2)}
        >
          Capteurs (123)
        </div>
        <div
          className={
            table === 3
              ? 'cursor-pointer rounded-tr-md bg-white px-5 text-sm font-semibold py-2 border-b-2 border-blue-700'
              : 'cursor-pointer rounded-tr-md bg-white px-5 text-sm py-2 border-b-2 text-gray-400 border-l'
          }
          onClick={() => setTable(3)}
        >
          Siredos (123)
        </div>
      </div>
      <div className='mt-1'>
        {table === 1 && (
          <div>
            <Table data={props.data} />
          </div>
        )}
        {table === 2 && <p className='text-white'>Tableau des capteurs hs</p>}
        {table === 3 && <p className='text-white'>Tableau des siredo hs</p>}
      </div>
    </div>
  );
};

export default Tables;
