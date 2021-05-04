import React, { useEffect, useState } from 'react';

const BoucleEditForm = props => {
  const [editedBoucleData, setEditedBoucleData] = useState([]);
  const [carfId, setCarfId] = useState();
  const [entry, setEntry] = useState();
  const [label, setLabel] = useState();
  const [comment, setComment] = useState();
  const [precise, setPrecise] = useState();
  const [urgent, setUrgent] = useState();
  const [updatedBy, setUpdatedBy] = useState('60759e92b67c11354d8c5cfd');

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BOUCLE_URL}/${props.editedBoucleId}`
    );
    const data = await res.json();
    setEditedBoucleData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editOneBoucle = async e => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_BOUCLE_URL}/${props.editedBoucleId}`,
      {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carfId: carfId,
          entry: entry,
          label: label,
          comment: comment,
          toPrecise: precise,
          isUrgent: urgent,
          // rajouter un update, ne pas écraser l'ancien
          update: [
            {
              by: updatedBy,
              date: Date.now
            }
          ]
        })
      }
    );
    fetchData();
  };

  return (
    <form onSubmit={editOneBoucle} className='flex flex-col m-2 border p-2'>
      <label className='flex flex-col' htmlFor='zone'>
        <span>Identifiant du feu (Z + C)</span>
        <input
          type='text'
          className='m-2 border'
          placeholder={editedBoucleData.carfId}
          disabled
        />
      </label>
      <label className='flex-col flex' htmlFor='entry'>
        <span>Entrée</span>
        <input
          id='entry'
          name='entry'
          typeof='text'
          placeholder='Entrée'
          defaultValue={editedBoucleData.entry}
          className='m-2 border'
          onBlur={e => setEntry(e.target.value)}
          required
        />
      </label>
      <label className='flex-col flex' htmlFor='label'>
        <span>Libellé</span>
        <input
          id='label'
          name='label'
          typeof='text'
          placeholder='Libellé'
          defaultValue={editedBoucleData.label}
          className='m-2 border'
          onBlur={e => setLabel(e.target.value)}
          required
        />
      </label>
      <label className='flex-col flex' htmlFor='comment'>
        <span>Commentaire</span>
        <textarea
          id='comment'
          name='comment'
          placeholder='Commentaire'
          defaultValue={editedBoucleData.comment}
          className='m-2 border'
          onBlur={e => setComment(e.target.value)}
          required
        />
      </label>
      <label className='flex my-1' htmlFor='urgent'>
        <span>Urgent</span>
        <input
          type='checkbox'
          name='urgent'
          id='urgent'
          defaultChecked={editedBoucleData.isUrgent}
          onChange={() => setUrgent(!urgent)}
          className='ml-5'
        />
      </label>
      <label className='flex my-1' htmlFor='precise'>
        <span>À préciser</span>
        <input
          type='checkbox'
          name='precise'
          id='precise'
          defaultChecked={editedBoucleData.toPrecise}
          onChange={() => setPrecise(!precise)}
          className='ml-5'
        />
      </label>
      <button
        className='w-16 bg-gray-400 border hover:bg-gray-300'
        type='submit'
        onClick={props.closeForm}
        onClickCapture={editOneBoucle}
      >
        Editer
      </button>
    </form>
  );
};

export default BoucleEditForm;
