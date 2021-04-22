import React from 'react';

const BoucleModal = ({ data }) => {
  return (
    <div>
      <h3>Boucle id : {data._id}</h3>
      <div>zone : {data.zone}</div>
      <div>carrefour : {data.crossroad}</div>
      <div>nature du carrefour : {data.nature}</div>
      <div>entry : {data.entry}</div>
      <div>label : {data.label}</div>
      <div>commentaire : {data.comment}</div>
      <div>à compléter ? : {data.toPrecise}</div>
      <div>urgent ? : {data.isUrgent}</div>
      <div>posté par : {data.postedBy.name}</div>
      <button className='w-16 bg-gray-400 border hover:bg-gray-300'>
        Editer
      </button>
      <button className='w-16 bg-gray-400 border hover:bg-gray-300'>
        Archiver
      </button>
    </div>
  );
};

export default BoucleModal;
