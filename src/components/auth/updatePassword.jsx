import React, { useState, useContext } from 'react';
import validator from 'validator';

import UserContext from '../../contexts/userContext';

const UpdatePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmNewPassword] = useState('');
  const [updateDone, setUpdateDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useContext(UserContext);

  const isFormOk = () => {
    const passwordValidator = validator.isStrongPassword(newPassword, {
      minUppercase: 0,
      minSymbols: 0
    });
    if (newPassword === confirmPassword && passwordValidator) {
      return true;
    }
  };

  const updatePassword = async e => {
    const error = document.getElementById('errorSignUp');
    e.preventDefault();
    setIsLoading(true);
    error.innerHTML = '';
    const res = await fetch(
      process.env.NEXT_PUBLIC_UPDATE_PASSWORD_URL + '/' + user.userId,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword
        })
      }
    );
    if (res.status === 401) {
      setIsLoading(false);
      return (error.innerHTML = 'Ancien mot de passe incorrect.');
    }
    setUpdateDone(true);
  };

  if (updateDone) {
    return (
      <div>
        <div className='m-auto'>
          <div>
            <h3>Mot de passe mis à jour avec succès.</h3>
          </div>
        </div>
      </div>
    );
  }
  return (
    <form className='w-1/2 border p-3 border-black' onSubmit={updatePassword}>
      <h2 className='text-lg font-semibold'>
        Formulaire de mise à jour du mot de passe
      </h2>
      <label htmlFor='password' className='flex flex-col'>
        Ancien mot de passe
        <input
          id='oldPassword'
          name='password'
          type='password'
          className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
          onChange={e => setOldPassword(e.target.value)}
          required
        />
      </label>
      <label htmlFor='password' className='flex flex-col'>
        Nouveau mot de passe
        <input
          id='newPassword'
          name='password'
          type='password'
          className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
          onChange={e => setNewPassword(e.target.value)}
          required
        />
      </label>
      <label htmlFor='password' className='flex flex-col'>
        Confirmer nouveau mot de passe
        <input
          id='confirmNewPassword'
          name='password'
          type='password'
          className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
          onChange={e => setConfirmNewPassword(e.target.value)}
          required
        />
      </label>
      <p id='errorSignUp' className='text-red-600'></p>
      {isLoading ? (
        <button className='border bg-blue-300 text-disable-button-text border-disable-button-border font-medium px-2 py-3 w-full rounded-md mr-1 cursor-not-allowed'>
          Mise à jour en cours...
        </button>
      ) : isFormOk() ? (
        <button
          className='border bg-blue-400 hover:bg-blue-500 text-white font-medium px-2 py-3 w-full rounded-md mr-1'
          type='submit'
        >
          Changer le mot de passe
        </button>
      ) : (
        <button className='border bg-blue-300 text-disable-button-text border-disable-button-border font-medium px-2 py-3 w-full rounded-md mr-1 cursor-not-allowed disabled'>
          Changer le mot de passe
        </button>
      )}
    </form>
  );
};

export default UpdatePasswordForm;
