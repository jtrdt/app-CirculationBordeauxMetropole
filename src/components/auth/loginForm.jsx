import React from 'react';
import Image from 'next/image';
import validator from 'validator';

const LoginForm = () => {
  const loginUser = async e => {
    e.preventDefault();
    const login = e.target.name.value.toLowerCase();
    const emailValidator = validator.isEmail(login);
    const error = document.getElementById('errorLogin');
    if (!emailValidator) {
      return (error.innerHTML = "Erreur dans le format de l'email");
    }
    {
      const resLogin = await fetch(process.env.NEXT_PUBLIC_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: login,
          password: e.target.password.value
        })
      });
      if (resLogin.status === 403) {
        return (error.innerHTML =
          'Utilisateur non validé, vérifiez vos emails.');
      }
      if (resLogin.status !== 200) {
        return (error.innerHTML = "Erreur d'authentification");
      }
      {
        const resJson = await resLogin.json();
        sessionStorage.setItem('user', resJson.token);
        window.location.href = '/boucle';
      }
    }
  };

  return (
    <form onSubmit={loginUser}>
      <div
        className='rounded-3xl py-8 px-24 border bg-login'
        style={{
          width: '640px',
          backdropFilter: 'blur(40px)'
        }}>
        <div className='text-center'>
          <Image
            src={'/BM_logo_positif_CMYK_horiz.png'}
            alt='Logo Bordeaux Métropole'
            width='283px'
            height='124px'
          />
        </div>
        <h3 className='text-2xl text-center pt-3 pb-4 text-white'>
          Poste de commandement Circulation
        </h3>
        <label htmlFor='name' className='flex flex-col'>
          <input
            id='name'
            name='name'
            typeof='text'
            placeholder='Email'
            className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
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
        </label>
        <button type='submit' className='hidden' />
        <p id='errorLogin' className='text-red-600'></p>
        <div className='border w-64 mx-auto mb-6 border-white'></div>
        <div className='text-center'>
          <p className='my-2'>
            <a href='#' className='hover:underline text-white'>
              Mot de passe oublié ?
            </a>
          </p>
          <p className='my-2 text-white'>
            Pas encore de compte ?{' '}
            <a
              href='/signup'
              className='font-medium hover:underline text-white'>
              Cliquez ici.
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
