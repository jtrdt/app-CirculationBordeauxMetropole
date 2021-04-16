import React from 'react';

const Boucle = ({ data }) => {
  return (
    <div className='bg-blue-100 flex flex-col mx-2 my-1 hover:shadow-md'>
      <span>id : {data._id}</span>
      <span>zone : {data.zone}</span>
      <span>carrefour : {data.crossroad}</span>
      <span>label : {data.label}</span>
      <span>comment : {data.comment}</span>
    </div>
  );
};

export default Boucle;
