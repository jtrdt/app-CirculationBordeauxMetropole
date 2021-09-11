import { LinearProgress, TextField } from '@material-ui/core';
import Image from 'next/image';
import React, { useState } from 'react';
import validator from 'validator';
import LogoBdxMetro from '../../../public/BM_logo_positif_CMYK_horiz.png';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async e => {
    e.preventDefault();
    setIsLoading(true);
    const login = e.target.email.value.toLowerCase();
    const emailValidator = validator.isEmail(login);
    const error = document.getElementById('errorLogin');
    error.innerHTML = '';
    if (!emailValidator) {
      return (error.innerHTML = "Erreur dans le format de l'email");
    }
    {
      const resLogin = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            email: login,
            password: e.target.password.value
          })
        }
      );
      if (resLogin.status === 403) {
        setIsLoading(false);
        return (error.innerHTML =
          'Utilisateur non validé, vérifiez vos emails.');
      }
      if (resLogin.status !== 200) {
        setIsLoading(false);
        return (error.innerHTML = "Erreur d'authentification.");
      }
      {
        const resJson = await resLogin.json();
        sessionStorage.setItem('user', resJson.token);
        window.location.href = '/boucle';
      }
    }
  };

  return (
    <section>
      <div className='rounded-3xl py-8 px-24 bg-white backdrop-filter backdrop-blur-3xl max-w-2xl border-4 border-blue-800'>
        <div className='text-center'>
          <Image
            src={LogoBdxMetro}
            alt='Logo Bordeaux Métropole'
            placeholder='blur'
          />
        </div>
        <h3 className='text-2xl text-center pt-3 pb-4'>
          Poste de commandement Circulation
        </h3>
        <form onSubmit={loginUser}>
          <label htmlFor='email' className='flex flex-col mb-3'>
            <TextField id='email' label='Email' required size='small' />
          </label>
          <label htmlFor='password' className='flex flex-col mb-3'>
            <TextField
              id='password'
              label='Mot de passe'
              size='small'
              type='password'
              required
            />
          </label>
          <button type='submit' className='hidden' />
        </form>
        <p id='errorLogin' className='text-red-600 pb-3'></p>
        {isLoading ? (
          <LinearProgress className='w-64 mb-6 mx-auto' />
        ) : (
          <div className='border w-64 mx-auto mb-6 border-blue-800'></div>
        )}
        <div className='text-center'>
          <p className='my-2'>
            <a href='/password_reset' className='hover:underline '>
              Mot de passe oublié ?
            </a>
          </p>
          <p className='my-2 '>
            Pas encore de compte ?{' '}
            <a href='/signup' className='font-medium hover:underline '>
              Cliquez ici.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
