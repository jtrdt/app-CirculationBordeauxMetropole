import React, { useEffect, useState, useContext } from 'react';
import { format, parseISO } from 'date-fns';
import UserContext from '../../contexts/userContext';

const EventEditForm = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataEvent, setDataEvent] = useState();
  const [newTitle, setNewTitle] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [color, setColor] = useState();
  const eventId = props.data;

  const userToken = sessionStorage.getItem('user');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_EVENT_URL}/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    });
    const data = await res.json();
    setDataEvent(data);
    setStartDate(format(parseISO(data.startDate), 'yyyy-MM-dd'));
    if (data.endDate) {
      setEndDate(format(parseISO(data.endDate), 'yyyy-MM-dd'));
    }
    setIsLoading(false);
  };

  const updateEvent = async e => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EVENT_URL}/${eventId}/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({
          title: newTitle,
          color,
          startDate,
          endDate
        })
      }
    );
    if (res.status === 200) {
      window.location.href = '/admin';
    }
  };

  const deleteEvent = async e => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_EVENT_URL}/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    });
    if (res.status === 200) {
      window.location.href = '/admin';
    }
  };

  if (isLoading === true) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-bg-form border p-5 rounded-md flex flex-col'>
      <div className='mb-2 border-b-4 border-gray-300 text-lg'>
        Ajoutée le {format(parseISO(dataEvent.createdAt), 'dd LLL yyyy')} par{' '}
        <span>{dataEvent.postedBy.username}</span>
      </div>
      <label>
        Titre
        <input
          defaultValue={dataEvent.title}
          type='text'
          onChange={e => setNewTitle(e.target.value)}
          className='p-1 bg-white border my-1 rounded-sm w-full'
        ></input>
      </label>
      <label>
        Couleur
        <input
          defaultValue={dataEvent.color}
          type='color'
          onChange={e => setColor(e.target.value)}
          className='bg-white border my-1 rounded-sm'
        ></input>
      </label>
      <label>
        Date de début
        <input
          type='date'
          defaultValue={startDate}
          onChange={e => setStartDate(e.target.value)}
          className='p-1 bg-white border my-1 rounded-sm w-full'
        ></input>
      </label>
      <label>
        Date de fin
        <input
          type='date'
          defaultValue={endDate}
          onChange={e => setEndDate(e.target.value)}
          className='p-1 bg-white border my-1 rounded-sm w-full'
        ></input>
      </label>
      <button
        className='border bg-green-600 hover:bg-green-800 text-white font-medium px-2 py-1 w-full rounded-md mt-6'
        type='submit'
        onClick={updateEvent}
      >
        Envoyer
      </button>
      <button
        className='border bg-red-600 hover:bg-red-800 text-white font-medium px-2 py-1 w-full rounded-md mt-6'
        type='submit'
        onClick={deleteEvent}
      >
        Supprimer
      </button>
    </div>
  );
};

export default EventEditForm;
