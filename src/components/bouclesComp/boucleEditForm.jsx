import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/userContext';

const BoucleEditForm = props => {
  const [editedBoucleData, setEditedBoucleData] = useState([]);
  const [newComment, setNewComment] = useState();
  const [precise, setPrecise] = useState();
  const [urgent, setUrgent] = useState();
  const [sendedDate, setSendedDate] = useState();
  const user = useContext(UserContext);

  const userToken = sessionStorage.getItem('user');

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
    setUrgent(data.isUrgent);
    setPrecise(data.toPrecise);
  };

  useEffect(() => {
    console.log('useEffect triggered');
    fetchData();
  }, []);

  const editOneBoucle = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BOUCLE_URL}/${props.editedBoucleId}/edit`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          toPrecise: precise,
          isUrgent: urgent,
          comment: newComment,
          sendedDate
        })
      }
    );

    if (res.status === 204) {
      window.location.href = '/boucle';
    }
    if (res.status === 401) {
      window.location.href = '/';
      sessionStorage.removeItem('user');
      const error = document.getElementById('error');
      return (error.innerHTML = "Erreur d'authentification");
    }
  };

  return (
    <form onSubmit={editOneBoucle} className='border p-5 rounded-md bg-bg-form'>
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
      {/* <label className='flex flex-col' htmlFor='comment'>
        <span>Commentaire</span>
        <input
          id='comment'
          name='comment'
          type='text'
          defaultValue={editedBoucleData.comment}
          className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
          disabled
        />
      </label> */}
      {/* {comments
        ? comments.map(data => {
            return (
              <p key={data._id}>
                '{data.content}' par : {data.by.name}
              </p>
            );
          })
        : null} */}
      <label className='flex-col flex' htmlFor='comment'>
        <span>Modifier le commentaire</span>
        <textarea
          id='comment'
          name='comment'
          defaultValue={editedBoucleData.comment}
          className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
          onBlur={e => setNewComment(e.target.value)}
          required
        />
      </label>
      {user.role === 'admin' && (
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
      )}
      <label
        className='flex my-1 items-center w-28 justify-between'
        htmlFor='urgent'
      >
        <span>Urgent</span>
        <input
          type='checkbox'
          name='urgent'
          id='urgent'
          defaultChecked={editedBoucleData.isUrgent}
          onBlur={() => setUrgent(!urgent)}
          className='ml-5'
        />
      </label>
      <label
        className='flex my-1 items-center w-28 justify-between'
        htmlFor='precise'
      >
        <span>À préciser</span>
        <input
          type='checkbox'
          name='precise'
          id='precise'
          defaultChecked={editedBoucleData.toPrecise}
          onBlur={() => setPrecise(!precise)}
          className='ml-5'
        />
      </label>
      <button
        className='border bg-green-600 hover:bg-green-800 text-white font-medium px-2 py-1 w-full rounded-md mt-6'
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
