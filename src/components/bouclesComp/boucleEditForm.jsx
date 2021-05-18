import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const BoucleEditForm = props => {
  const [editedBoucleData, setEditedBoucleData] = useState([]);
  const [newComment, setNewComment] = useState();
  const [precise, setPrecise] = useState();
  const [urgent, setUrgent] = useState();
  const [updatedBy, setUpdatedBy] = useState();
  const [sendedDate, setSendedDate] = useState();

  const userToken = localStorage.getItem('user');

  const [comments, setComments] = useState(editedBoucleData.comments);
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
    setComments(data.comments);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      const decoded = jwt_decode(userToken);
      setUpdatedBy(decoded.userId);
    }
    fetchData();
  }, []);

  // const editOneBoucle = async e => {
  //   e.preventDefault();
  //   await fetch(
  //     `${process.env.NEXT_PUBLIC_BOUCLE_URL}/${props.editedBoucleId}`,
  //     {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${userToken}`
  //       },
  //       body: JSON.stringify({
  //         toPrecise: precise,
  //         isUrgent: urgent,
  //         sendedDate: sendedDate,
  //         comments: {
  //           by: user.userId,
  //           content: newComment
  //         }
  //       })
  //     }
  //   );
  // };

  return (
    <form onSubmit={editOneBoucle} className='flex flex-col m-2 border p-2'>
      {/* <label className='flex flex-col' htmlFor='zone'>
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
          type='text'
          placeholder={editedBoucleData.entry}
          className='m-2 border'
          disabled
        />
      </label>
      <label className='flex-col flex' htmlFor='label'>
        <span>Libellé</span>
        <input
          id='label'
          name='label'
          type='text'
          placeholder={editedBoucleData.label}
          className='m-2 border'
          disabled
        />
      </label> */}
      <label className='flex-col flex' htmlFor='comment'>
        <span>Commentaire</span>
        <input
          id='comment'
          name='comment'
          type='text'
          defaultValue={editedBoucleData.comment}
          className='m-2 border'
          disabled
        />
      </label>
      {comments
        ? comments.map(data => {
            return (
              <p key={data._id}>
                '{data.content}' par : {data.by.name}
              </p>
            );
          })
        : null}
      <label className='flex-col flex' htmlFor='comment'>
        <span>Ajoutez un commentaire</span>
        <textarea
          id='comment'
          name='comment'
          placeholder='Commentaire'
          className='m-2 border'
          onBlur={e => setNewComment(e.target.value)}
          required
        />
      </label>
      <label className='flex-col flex' htmlFor='sendedDate'>
        <span>Tramis le</span>
        <input
          id='sendedDate'
          type='date'
          className='m-2 border'
          defaultValue={editedBoucleData.sendedDate}
          onBlur={e => setSendedDate(e.target.value)}
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
