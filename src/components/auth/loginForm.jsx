import React, { useState } from 'react';
import Image from 'next/image';
import LogoBdxMetro from '../../../public/BM_logo_positif_CMYK_horiz.png';
import validator from 'validator';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = async e => {
    e.preventDefault();
    setIsLoading(true);
    const login = e.target.name.value.toLowerCase();
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
      <div className='rounded-3xl py-8 px-24 border bg-login backdrop-filter backdrop-blur-3xl max-w-2xl'>
        <div className='text-center'>
          <Image
            src={LogoBdxMetro}
            alt='Logo Bordeaux Métropole'
            placeholder='blur'
          />
        </div>
        <h3 className='text-2xl text-center pt-3 pb-4 text-white'>
          Poste de commandement Circulation
        </h3>
        <form onSubmit={loginUser}>
          <label htmlFor='name' className='flex flex-col'>
            <input
              id='name'
              name='name'
              typeof='text'
              placeholder='Email'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 w-96 leading-5 border-blue-300 text-black'
              required
            />
          </label>
          <label htmlFor='password' className='flex flex-col'>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Mot de passe'
              className='mt-1 mb-8 rounded-md border-2 px-2 py-3 pl-4 leading-5  border-blue-300 text-black'
              required
            />
            {isLoading ? <button class='btn btn-sm btn-ghost loading' /> : null}
          </label>
          <button type='submit' className='hidden' />
        </form>
        <p id='errorLogin' className='text-red-600 pb-3'></p>
        <div className='border w-64 mx-auto mb-6 border-white'></div>
        <div className='text-center'>
          <p className='my-2'>
            <a href='/password_reset' className='hover:underline text-white'>
              Mot de passe oublié ?
            </a>
          </p>
          <p className='my-2 text-white'>
            Pas encore de compte ?{' '}
            <a
              href='/signup'
              className='font-medium hover:underline text-white'
            >
              Cliquez ici.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
