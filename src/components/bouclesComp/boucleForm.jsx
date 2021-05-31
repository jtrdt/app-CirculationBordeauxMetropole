import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/userContext';

const BoucleForm = props => {
  const [carfId, setCarfId] = useState();
  const [label, setLabel] = useState();
  const [comment, setComment] = useState();
  const [urgent, setUrgent] = useState(false);
  const [precise, setPrecise] = useState(false);
  const [nature, setNature] = useState();
  const [entry, setEntry] = useState();
  const user = useContext(UserContext);

  const dataCarf = props.data.features;
  const userToken = sessionStorage.getItem('user');

  const addNewBoucle = async e => {
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_BOUCLE_URL, {
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
        postedBy: user.userId,
        isUrgent: urgent,
        toPrecise: precise,
        nature: nature
      })
    });
    if (res.status === 201) {
      window.location.href = '/boucle';
    }
    if (res.status === 401) {
      window.location.href = '/';
      sessionStorage.removeItem('user');
      const error = document.getElementById('error');
      return (error.innerHTML = "Erreur d'authentification");
    }
    if (res.status === 400) {
      return (error.innerHTML = "Data error: vérifiez les données envoyées");
    }
  };

  return (
    <form onSubmit={addNewBoucle} className='border p-5 rounded-md bg-bg-form'>
      <label className='flex flex-col' htmlFor='zone'>
        <span>Z _ _C _ _ + Centralisation</span>
        <input
          type='search'
          list='zone'
          className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
          onChange={e => {
            const value = e.target.value;
            const carf = value.split(' / ');
            const idCarf = carf[0];
            const nature = carf[1];
            setCarfId(idCarf);
            setNature(nature);
          }}
          required
        />
        <datalist id='zone' className='m-2 border' required>
          {dataCarf.map((carf, i) => (
            <option key={i} value={carf.properties.ident + ' / ' + carf.properties.nature} />
          ))}
        </datalist>
      </label>
      <label className='flex flex-col' htmlFor='entry'>
        <span>Entrée</span>
        <input
          id='entry'
          name='entry'
          typeof='text'
          className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
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
          className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
          onBlur={e => setLabel(e.target.value)}
          required
        />
      </label>
      <label className='flex-col flex' htmlFor='comment'>
        <span>Commentaire</span>
        <textarea
          id='comment'
          name='comment'
          className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
          onBlur={e => setComment(e.target.value)}
          required
        />
      </label>
      <label className='flex my-1 items-center w-28 justify-between' htmlFor='urgent'>
        <span>Urgent</span>
        <input
          type='checkbox'
          name='urgent'
          id='urgent'
          defaultChecked={false}
          onChange={() => setUrgent(!urgent)}
        />
      </label>
      <label className='flex my-1 items-center w-28 justify-between' htmlFor='precise'>
        <span>À préciser</span>
        <input
          type='checkbox'
          name='precise'
          id='precise'
          defaultChecked={false}
          onChange={() => setPrecise(!precise)}
        />
      </label>
      <p id='error' className='text-red-600'></p>
      <button
        className='border bg-green-600 hover:bg-green-800 text-white font-medium px-2 py-1 w-full rounded-md mt-6'
        type='submit'
      >
        Ajouter
      </button>
    </form>
  );
};

export default BoucleForm;
