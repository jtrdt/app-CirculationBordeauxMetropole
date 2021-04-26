import React from 'react';

const Boucle = ({ data }) => {
  return (
    <div className='bg-blue-100 flex mx-2 my-1 hover:shadow-md'>
      <span className='px-2 border-r border-black'>
        posté le : {data.createdAt} {/* .toLocaleDateString('en-GB') */}
      </span>
      <span className='px-2 border-r border-black'>
        par : {data.postedBy.name}
      </span>
      <span className='px-2 border-r border-black'>zone : {data.zone}</span>
      <span className='px-2 border-r border-black'>
        carrefour : {data.crossroad}
      </span>
      <span className='px-2 border-r border-black'>entrée : {data.entry}</span>

      <span className='px-2 border-r border-black'>libellé : {data.label}</span>
      <span className='px-2 border-r border-black sha'>
        commentaire : {data.comment}
      </span>
    </div>
  );
};

export default Boucle;
