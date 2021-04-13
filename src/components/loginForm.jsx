import React from 'react';

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

    // mauvais mdp ou utilisateur non reconnu
    if (res.status === 401) {
      console.log('mauvais mdp ou utilisateur non reconnu');
    }

    // utilisateur log
    if (res.status === 200) {
    }
  };

  return (
    <form onSubmit={loginUser} className='m-1 border p-2 flex-col max-w-min'>
      <h3 className='font-bold m-1'>LOGIN</h3>
      <label htmlFor='name'>
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
        Register
      </button>
    </form>
  );
};

export default LoginForm;
