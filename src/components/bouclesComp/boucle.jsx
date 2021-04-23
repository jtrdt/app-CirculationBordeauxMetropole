import React from 'react';

const Boucle = ({ data }) => {
  return (
    <div>
      <div
        className='bg-blue-100 flex mx-2 my-1 hover:shadow-md'
        // onClick={openModal}
      >
        <span className='px-2 border-r border-black'>id : {data._id}</span>
        <span className='px-2 border-r border-black'>zone : {data.zone}</span>
        <span className='px-2 border-r border-black'>
          carrefour : {data.crossroad}
        </span>
        <span className='px-2 border-r border-black'>label : {data.label}</span>
        <span className='px-2 border-r border-black sha'>
          comment : {data.comment}
        </span>
      </div>
    </div>
  );
};

export default Boucle;
