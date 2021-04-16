import React from 'react';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const loginUser = async (event) => {
    event.preventDefault();

    const login = event.target.name.value.toLowerCase();

    const res = await fetch(process.env.NEXT_PUBLIC_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: login,
        password: event.target.password.value
      })
    });
    console.log(res);
    // .then((res) => res.json())
    // .then((res) => {
    //   if (res && res.error) {
    //     console.log(res.error);
    //   }
    //   if (res && res.token) {
    //     Cookies.set('tokenpcbm', res.token, { expires: 1 }); // === 1d
    //   }
    // })
    // .catch((error) => res.status(401).json({ error }));
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
      <button className='border bg-gray-100' type='submit'>
        Connexion
      </button>
    </form>
  );
};

export default LoginForm;
