import React, { useState } from 'react';
import validator from 'validator';

const UpdateResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  const updateResetPassword = async e => {
    const error = document.getElementById('errorPassword');
    const resetOk = document.getElementById('resetOk');
    resetOk.innerHTML = '';
    error.innerHTML = '';
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('user');
    setToken(token);
    setUserId(userId);
    const passwordValidator = validator.isStrongPassword(password, {
      minUppercase: 0,
      minSymbols: 0
    });
    if (!passwordValidator || password !== confirmPwd) {
      return (error.innerHTML = 'Format du mot de passe incorrect.');
    }
    const res = await fetch(process.env.NEXT_PUBLIC_RESET_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: userId,
        token,
        password
      })
    });
    if (res.status === 200) {
      window.setTimeout(() => (window.location.href = '/'), 3000);
      return (resetOk.innerHTML =
        'Mise à jour du mot de passe effectuée, vous allez être redirigez dans quelques secondes.');
    }
    if (res.status === 500) {
      return (resetOk.innerHTML =
        'Mise à jour du mot de passe déjà effectuée, si vous souhaitez en créer un nouveau, <a href="/password_reset" style="text-decoration : underline">cliquez ici</a>.');
    }
  };

  return (
    <form onSubmit={updateResetPassword}>
      <div
        className='rounded-3xl py-8 px-24 border bg-login backdrop-filter backdrop-blur-3xl'
        style={{ width: '640px' }}>
        <h3 className='text-2xl text-center pt-3 pb-4 text-white'>
          Réinitialisation du mot de passe
        </h3>
        <label htmlFor='password' className='flex flex-col text-white'>
          Nouveau mot de passe
          <span className='text-xs text-gray-600'>
            Minimum 8 caractères dont 1 chiffre
          </span>
          <input
            name='password'
            type='password'
            className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor='password' className='flex flex-col text-white'>
          Confirmer le nouveau mot de passe
          {confirmPwd.length >= 3 && confirmPwd !== password ? (
            <input
              name='confirm password'
              type='password'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-red-500 text-black'
              onChange={e => setConfirmPwd(e.target.value)}
              required
            />
          ) : (
            <input
              name='confirm password'
              type='password'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
              onChange={e => setConfirmPwd(e.target.value)}
              required
            />
          )}
        </label>
        <button type='submit' className='hidden' />
        <p id='errorPassword' className='text-red-600'></p>
        <p id='resetOk' className='text-gray-600'></p>
      </div>
    </form>
  );
};

export default UpdateResetPassword;
