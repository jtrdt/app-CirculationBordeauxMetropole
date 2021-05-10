import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const BoucleForm = props => {
  const [carfId, setCarfId] = useState();
  const [label, setLabel] = useState();
  const [comment, setComment] = useState();
  const [urgent, setUrgent] = useState(false);
  const [precise, setPrecise] = useState(false);
  const [nature, setNature] = useState();
  const [entry, setEntry] = useState();
  const [postedBy, setPostedBy] = useState();

  const dataCarf = props.data.features;
  const userToken = localStorage.getItem('user');

  useEffect(() => {
    if (userToken) {
      const decoded = jwt_decode(userToken);
      setPostedBy(decoded.userId);
    }
  });

  const addNewBoucle = async e => {
    e.preventDefault(); // a changer
    await fetch(process.env.NEXT_PUBLIC_BOUCLE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        carfId: carfId,
        label: label,
        comment: comment,
        entry: entry,
        postedBy: postedBy,
        isUrgent: urgent,
        toPrecise: precise,
        nature: nature
      })
    })
  };

  // const updateOneBoucle = async (e) => {
  //   const id = e.target.id;
  //   await fetch(`process.env.NEXT_PUBLIC_BOUCLE_URL/${id}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       carfId: carfId,
  //       label: label,
  //       comment: comment,
  //       entry: entry,
  //       postedBy: postedBy,
  //       isUrgent: urgent,
  //       toPrecise: precise
  //     })
  //   });
  // }

  return (
    <form onSubmit={addNewBoucle} className='flex flex-col m-2 border p-2'>
      <label className='flex flex-col' htmlFor='zone'>
        <span>Identifiant du feu (Z + C)</span>
        <input
          type='text'
          list='zone'
          className='m-2 border'
          placeholder='Identifiant feu'
          onChange={e => {
            // dégeux
            const value = e.target.value;
            const carf = value.split(' / ');
            const idCarf = carf[0];
            const nature = carf[1];
            setCarfId(idCarf);
            setNature(nature);
          }}
          required
        />
        <datalist id='zone' placeholder='Zone' className='m-2 border' required>
          {dataCarf.map((carf, i) => (
            <option
              key={i}
              value={carf.properties.ident + ' / ' + carf.properties.nature}
            />
          ))}
        </datalist>
      </label>
      <label className='flex-col flex' htmlFor='entry'>
        <span>Entrée</span>
        <input
          id='entry'
          name='entry'
          typeof='text'
          placeholder='Entrée'
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
          defaultChecked={false}
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
          defaultChecked={false}
          onChange={() => setPrecise(!precise)}
          className='ml-5'
        />
      </label>
      <button
        className='w-16 bg-gray-400 border hover:bg-gray-300'
        type='submit'
      >
        Ajouter
      </button>
    </form>
  );
};

export default BoucleForm;
