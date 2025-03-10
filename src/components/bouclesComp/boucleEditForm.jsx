import React, { useEffect, useState, useContext } from 'react';
import { format, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../contexts/userContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BoucleEditForm = props => {
  const [dataBoucle, setDataBoucle] = useState();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState();
  const [carfId, setCarfId] = useState();
  const [nature, setNature] = useState();
  const [label, setLabel] = useState();
  const [comment, setComment] = useState();
  const user = useContext(UserContext);

  const userToken = sessionStorage.getItem('user');

  const id = props.data;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boucles?id=${id}`
    );
    const data = await res.json();
    setDataBoucle(data);
    setComments(data.comments.reverse());
    setIsLoading(false);
  };

  const addNewComment = async e => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boucles/${dataBoucle._id}/comment`,
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
      fetchData();
      notifyNewComment();
    }
  };

  const deleteComment = async id => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boucles/${dataBoucle._id}/comment`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          id: id
        })
      }
    );
    if (res.status === 200) {
      fetchData();
      notifyDeleteComment();
    }
  };

  const editBoucle = async e => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boucles/${dataBoucle._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          carfId,
          nature,
          label,
          comment
        })
      }
    );
    if (res.status === 200) {
      fetchData();
      notifyUpdate();
    }
  };

  const notifyUpdate = () => toast('Mise à jour effectuée');
  const notifyDeleteComment = () => toast('Commentaire supprimé');
  const notifyNewComment = () => toast('Nouveau commentaire ajoutée');

  if (isLoading === true) {
    return <div>Chargement en cours...</div>;
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
          className='p-1 bg-white border my-1 rounded-sm w-full'
          onChange={e => setCarfId(e.target.value)}
        ></input>
      </label>
      <div className='flex'>
        <label className='mr-2 w-1/2 flex flex-col'>
          Nature{' '}
          <input
            defaultValue={dataBoucle.nature}
            className='p-1 bg-white border my-1 rounded-sm w-full'
            onChange={e => setNature(e.target.value)}
          ></input>
        </label>
        <label className='w-1/2 flex flex-col'>
          Libellée{' '}
          <input
            defaultValue={dataBoucle.label}
            className='p-1 bg-white border my-1 rounded-sm w-full'
            onChange={e => setLabel(e.target.value)}
          ></input>
        </label>
      </div>
      <label>
        Commentaire{' '}
        <input
          defaultValue={dataBoucle.comment}
          className='p-1 bg-white border my-1 rounded-sm w-full'
          onChange={e => setComment(e.target.value)}
        ></input>
      </label>
      <button
        className='border bg-green-600 hover:bg-green-800 text-white font-medium px-2 py-1 w-full rounded-md mt-6'
        onClick={editBoucle}
      >
        Edit
      </button>
      <div className='max-h-80 overflow-scroll my-2'>
        {comments.map(comment => {
          const date = format(parseISO(comment.date), 'dd LLL yyyy');
          return (
            <ul>
              <li
                key={comment._id}
                className='border p-2 m-3 mr-0 bg-yellow-100 flex justify-between items-center'
              >
                <div>
                  <span className='text-gray-500 text-sm flex flex-col'>
                    {comment.by.username} le {date}
                  </span>
                  {comment.content}
                </div>
                {user.role === 'admin' || comment.by._id === user.userId ? (
                  <FontAwesomeIcon
                    icon={faTimes}
                    className='text-red-600 cursor-pointer m-1'
                    onClick={() => deleteComment(comment._id)}
                  />
                ) : null}
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
          required
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
