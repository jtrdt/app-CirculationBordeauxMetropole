import React from 'react';
import validator from 'validator';

const LoginForm = () => {
  const loginUser = async e => {
    e.preventDefault();
    const login = e.target.name.value.toLowerCase();
    const emailValidator = validator.isEmail(login);
    const error = document.getElementById('errorLogin');
    if (!emailValidator) {
      return (error.innerHTML = 'Erreur dans le format de l\'email');
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
      if (resLogin.status !== 200) {
        return (error.innerHTML = "Erreur d'authentification");
      }
      {
        const resJson = await resLogin.json();
        localStorage.setItem('user', resJson.token);
        window.location.href = '/boucle';
      }
    }
  };

  return (
    <form onSubmit={loginUser} className='w-80'>
      <h3 className='font-bold m-1'>Se connecter</h3>
      <div className='bg-transparent-bg p-5 rounded-md'>
        <label htmlFor='name' className='flex flex-col'>
          Email
          <input
            id='name'
            name='name'
            typeof='text'
            className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
            required
          />
        </label>
        <label htmlFor='password' className='flex flex-col'>
          Mot de passe
          <input
            id='password'
            name='password'
            type='password'
            className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
            required
          />
        </label>
        <p id='errorLogin' className='text-red-600'></p>
        <button
          className='border bg-green-600 hover:bg-green-800 text-white font-medium px-2 py-1 w-full rounded-md'
          type='submit'
        >
          Connexion
        </button>
      </div>
      <p className='my-2'>
        Pas encore de compte ?{' '}
        <a href='/signup' className='text-blue-800 underline'>
          Cliquez ici
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
