import React, { useState } from 'react';

const BoucleForm = () => {
  const [zone, setZone] = useState(''); // tapper dans la bdd opendatabdx pour avoir les Z possibles en présélection
  const [crossroad, setCrossroad] = useState(''); // tapper dans la bdd opendatabdx pour avoir les C possibles en présélection
  const [label, setLabel] = useState('');
  const [comment, setComment] = useState('');
  const [urgent, setUrgent] = useState(false); // false par défault, a passer en true qd la case est cochée
  const [precise, setPrecise] = useState(false); // false par défault, a passer en true qd la case est cochée
  const [nature, setNature] = useState(''); // récupérer automatiquement la nature du croisement une fois l'id du carrefour renseigné avant l'envoie du formulaire
  const [entry, setEntry] = useState('xx');
  const [postedBy, setPostedBy] = useState('60759e92b67c11354d8c5cfd'); //récupérer le userId en cours d'utilisation

  const addNewBoucle = async (event) => {
    event.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_BOUCLE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zone: zone,
        comment: comment,
        label: label,
        entry: entry,
        crossroad: crossroad,
        postedBy: postedBy
      })
    });
  };

  return (
    <form onSubmit={addNewBoucle} className='flex flex-col m-2 border p-2'>
      <h3>Nouvelle entrée</h3>
      <label className='flex flex-col' htmlFor='zone'>
        <span>Zone</span>
        <input
          id='zone'
          name='zone'
          typeof='text'
          placeholder='Zone'
          className='m-2 border'
          onChange={(e) => setZone(e.target.value)}
          required
        />
      </label>
      <label className='flex-col flex' htmlFor='crossroad'>
        <span>Carrefour</span>
        <input
          id='crossroad'
          name='crossroad'
          typeof='text'
          placeholder='Carrefour'
          className='m-2 border'
          onChange={(e) => setCrossroad(e.target.value)}
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
          className='m-2 border'
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </label>
      <label className='flex-col flex' htmlFor='comment'>
        <span>Commentaire</span>
        <textarea
          id='comment'
          name='comment'
          placeholder='Commentaire'
          className='m-2 border'
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </label>
      <label className='flex my-1' htmlFor='urgent'>
        <span>Urgent</span>
        <input type='checkbox' name='urgent' id='urgent' className='ml-5' />
      </label>
      <label className='flex my-1' htmlFor='precise'>
        <span>À préciser</span>
        <input type='checkbox' name='precise' id='precise' className='ml-5' />
      </label>
      <button
        className='w-16 bg-gray-500 border hover:bg-gray-300'
        type='submit'
        value='Ajouter une nouvelle boucle coupée'>
        Ajouter
      </button>
    </form>
  );
};

export default BoucleForm;
