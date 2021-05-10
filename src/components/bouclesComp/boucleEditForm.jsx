import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const BoucleEditForm = props => {
  const [editedBoucleData, setEditedBoucleData] = useState([]);
  const [entry, setEntry] = useState();
  const [label, setLabel] = useState();
  const [comment, setComment] = useState();
  const [precise, setPrecise] = useState();
  const [urgent, setUrgent] = useState();
  const [updatedBy, setUpdatedBy] = useState();

  const userToken = localStorage.getItem('user');

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BOUCLE_URL}/${props.editedBoucleId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );
    const data = await res.json();
    setEditedBoucleData(data);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      const decoded = jwt_decode(userToken);
      setUpdatedBy(decoded.userId);
    }
    fetchData();
  }, []);

  const editOneBoucle = async e => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_BOUCLE_URL}/${props.editedBoucleId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          entry: entry,
          label: label,
          comment: comment,
          toPrecise: precise,
          isUrgent: urgent,
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
          onBlur={e => setUrgent(e.target.checked)}
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
          onBlur={e => setPrecise(e.target.checked)}
          className='ml-5'
        />
      </label>
      <button
        className='btn'
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
