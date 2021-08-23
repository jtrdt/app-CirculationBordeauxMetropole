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
      <label>
        Identifiant du carrefour :{' '}
        <input
          defaultValue={dataBoucle.carfId}
          disabled
          className='p-1 bg-white border my-1 rounded-sm text-gray-500'
        ></input>
      </label>
      <label>
        Posté par :{' '}
        <input
          defaultValue={dataBoucle.postedBy.username}
          disabled
          className='p-1 bg-white border my-1 rounded-sm text-gray-500'
        ></input>
      </label>
      <label>
        Commentaire :{' '}
        <input
          defaultValue={dataBoucle.comment}
          disabled
          className='p-1 bg-white border my-1 rounded-sm text-gray-500'
        ></input>
      </label>
      <div>
        {dataBoucle.comments.map(comment => {
          const date = format(parseISO(comment.date), 'dd LLL yyyy');
          return (
            <ul>
              <li
                key={comment._id}
                className='flex flex-col border p-2 m-3 bg-yellow-100'
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
        <label>Ajouter un commentaire : </label>
        <input
          type='text'
          className='p-1 bg-white border my-1 rounded-sm text'
          onChange={e => setNewComment(e.target.value)}
        ></input>
        <button className=''>Envoyer</button>
      </form>
    </div>
  );
};

export default BoucleEditForm;
