import { CircularProgress, TextField } from '@material-ui/core';
import Image from 'next/image';
import React, { useState } from 'react';
import validator from 'validator';
import LogoBdxMetro from '../../../public/BM_logo_positif_CMYK_horiz.png';

const UpdateResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const updateResetPassword = async e => {
    setIsLoading(true);
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/resetpassword`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          token,
          password
        })
      }
    );
    if (res.status === 200) {
      setIsLoading(false);
      window.setTimeout(() => (window.location.href = '/'), 3000);
      return (resetOk.innerHTML =
        'Mise à jour du mot de passe effectuée, vous allez être redirigez dans quelques secondes.');
    }
    if (res.status === 500) {
      setIsLoading(false);
      return (resetOk.innerHTML =
        'Mise à jour du mot de passe déjà effectuée, si vous souhaitez en créer un nouveau, <a href="/password_reset" style="text-decoration : underline">cliquez ici</a>.');
    }
  };

  return (
    <form onSubmit={updateResetPassword}>
      <div className='rounded-3xl py-8 px-24 bg-white backdrop-filter backdrop-blur-3xl max-w-2xl border-4 border-blue-800'>
        <div className='text-center'>
          <Image
            src={LogoBdxMetro}
            alt='Logo Bordeaux Métropole'
            placeholder='blur'
          />
        </div>
        <h3 className='text-2xl text-center pt-3 pb-4 '>
          Réinitialisation du mot de passe
        </h3>
        <label htmlFor='password' className='flex flex-col mb-4'>
          <TextField
            id='password'
            label='Nouveau mot de passe'
            size='small'
            type='password'
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span className='text-xs text-gray-600'>
            Minimum 8 caractères dont 1 chiffre
          </span>
        </label>
        <label htmlFor='password' className='flex flex-col mb-4'>
          {confirmPwd.length >= 3 && confirmPwd !== password ? (
            <TextField
              error
              id='standard-error-helper-text'
              label='Confirmer mot de passe'
              type='password'
              onChange={e => setConfirmPwd(e.target.value)}
            />
          ) : (
            <TextField
              id='confirm-password'
              label='Confirmer mot de passe'
              required
              size='small'
              type='password'
              onChange={e => setConfirmPwd(e.target.value)}
            />
          )}
        </label>
        {isLoading ? <CircularProgress size='20px' /> : null}
        <button type='submit' className='hidden' />
        <p id='errorPassword' className='text-red-600'></p>
        <p id='resetOk' className='text-gray-600'></p>
        <a href='/' className='hover:underline text-base underline'>
          Revenir à l'accueil.
        </a>
      </div>
    </form>
  );
};

export default UpdateResetPassword;
