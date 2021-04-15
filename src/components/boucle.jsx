import React from 'react';

const Boucle = ({ data }) => {
  return (
    <div className='bg-blue-100 flex flex-col m-2 mt-2 border'>
      <span>id : {data._id}</span>
      <span>zone : {data.zone}</span>
      <span>carrefour : </span>
      <span>label : </span>
      <span>comment : </span>
      <span>urgent? : </span>
      <span>à préciser? : </span>
    </div>
  );
};

export default Boucle;
