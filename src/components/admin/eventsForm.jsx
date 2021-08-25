import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/userContext';

const EventsForm = () => {
  const [title, setTitle] = useState();
  const [color, setColor] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const user = useContext(UserContext);

  const createEvent = async () => {
    const userToken = sessionStorage.getItem('user');
    const res = await fetch(process.env.NEXT_PUBLIC_EVENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        title,
        color,
        startDate,
        endDate,
        postedBy: user.userId
      })
    });
  };

  return (
    <form className='flex flex-col' onSubmit={createEvent}>
      <h3>-- Créer un nouveau chantier --</h3>
      <input
        type='text'
        placeholder='Titre'
        required
        onChange={e => setTitle(e.target.value)}
      />
      <label>
        Couleur :
        <input
          type='color'
          id='color'
          required
          onChange={e => setColor(e.target.value)}
        />
      </label>
      <label>
        Date de début :
        <input type='date' onChange={e => setStartDate(e.target.value)} />
      </label>
      <label>
        Date de fin :
        <input type='date' onChange={e => setEndDate(e.target.value)} />
      </label>
      <button className='p-1 border mt-2 ml-0 bg-gray-200 hover:bg-gray-300'>
        Envoyer
      </button>
    </form>
  );
};

export default EventsForm;
