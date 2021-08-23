import React, { useEffect, useState, useContext } from 'react';
import { format, parseISO } from 'date-fns';
import UserContext from '../../contexts/userContext';

const BoucleEditForm = props => {
  const [dataBoucle, setDataBoucle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState();
  const user = useContext(UserContext);

  const userToken = sessionStorage.getItem('user');

  const id = props.data;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BOUCLE_URL}?id=${id}`);
    const data = await res.json();
    setDataBoucle(data);
    setIsLoading(false);
  };

  const addNewComment = async e => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BOUCLE_URL}/${dataBoucle._id}/comment`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          comments: {
            by: user.userId,
            content: newComment
          }
        })
      }
    );
    if (res.status === 200) {
      window.location.href = '/boucle';
    }
  };

  if (isLoading === true) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-bg-form border p-5 rounded-md flex flex-col'>
      <div className='mb-2 border-b-4 border-gray-300 text-lg'>
        Ajoutée le {format(parseISO(dataBoucle.createdAt), 'dd LLL yyyy')} par{' '}
        <span>{dataBoucle.postedBy.username}</span>
      </div>
      <label>
        Identifiant du carrefour{' '}
        <input
          defaultValue={dataBoucle.carfId}
          disabled
          className='p-1 bg-white border my-1 rounded-sm text-gray-500 w-full'
        ></input>
      </label>
      <div className='flex'>
        <label className='mr-2 w-1/2 flex flex-col'>
          Nature{' '}
          <input
            defaultValue={dataBoucle.nature}
            disabled
            className='p-1 bg-white border my-1 rounded-sm text-gray-500 w-full'
          ></input>
        </label>
        <label className='w-1/2 flex flex-col'>
          Libellée{' '}
          <input
            defaultValue={dataBoucle.label}
            disabled
            className='p-1 bg-white border my-1 rounded-sm text-gray-500 w-full'
          ></input>
        </label>
      </div>
      <label>
        Commentaire{' '}
        <input
          defaultValue={dataBoucle.comment}
          disabled
          className='p-1 bg-white border my-1 rounded-sm text-gray-500 w-full'
        ></input>
      </label>
      <div className='max-h-80 overflow-scroll my-2'>
        {dataBoucle.comments.reverse().map(comment => {
          const date = format(parseISO(comment.date), 'dd LLL yyyy');
          return (
            <ul>
              <li
                key={comment._id}
                className='flex flex-col border p-2 m-3 mr-0 bg-yellow-100'
              >
                <span className='text-gray-500 text-sm'>
                  {comment.by.username} le {date}
                </span>
                {comment.content}
              </li>
            </ul>
          );
        })}
      </div>
      <form className='flex flex-col' onSubmit={addNewComment}>
        <label>Ajouter un nouveau commentaire : </label>
        <textarea
          type='text'
          className='p-1 bg-white border my-1 rounded-sm text'
          onChange={e => setNewComment(e.target.value)}
        ></textarea>
        <button
          className='border bg-green-600 hover:bg-green-800 text-white font-medium px-2 py-1 w-full rounded-md mt-6'
          type='submit'
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default BoucleEditForm;
