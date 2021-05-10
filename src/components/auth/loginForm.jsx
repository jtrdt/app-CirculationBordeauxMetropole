import React from 'react';

const LoginForm = () => {
  const loginUser = async event => {
    event.preventDefault();

    const login = event.target.name.value.toLowerCase();
    const res = await fetch(process.env.NEXT_PUBLIC_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: login,
        password: event.target.password.value
      })
    });

    if (res.status === 200) {
      const resJson = await res.json();
      localStorage.setItem('user', resJson.token);
      window.location.href = '/boucle';
    }
    if (res.status === 401) {
      const error = document.getElementById('error');
      return (error.innerHTML = "Erreur d'authentification");
    }
  };

  return (
    <form onSubmit={loginUser} className='m-1 border p-2 flex-col max-w-min'>
      <h3 className='font-bold m-1'>LOGIN</h3>
      <label htmlFor='name'>
        Login
        <input
          id='name'
          name='name'
          typeof='text'
          placeholder='Login'
          className='m-2 border'
          required
        />
      </label>
      <label htmlFor='password'>
        Mot de passe
        <input
          id='password'
          name='password'
          type='password'
          placeholder='Mot de passe'
          className='m-2 border'
          required
        />
      </label>
      <p id='error' className='text-red-600'></p>
      <button className='border bg-gray-100' type='submit'>
        Connexion
      </button>
    </form>
  );
};

export default LoginForm;
