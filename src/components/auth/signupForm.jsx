import React, { useState } from 'react';

const SignUpForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signupUser = async e => {
    e.preventDefault();

    const res = await fetch(process.env.NEXT_PUBLIC_SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    console.log(res);
  };

  return (
    <form onSubmit={signupUser} className='m-1 border p-2 flex-col max-w-min'>
      <h3 className='font-bold m-1'>SIGNUP</h3>
      <label htmlFor='name'>
        Email
        <input
          name='email'
          type='email'
          placeholder='Email'
          className='m-2 border'
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor='password'>
        Mot de passe
        <input
          name='password'
          type='password'
          placeholder='Mot de passe'
          className='m-2 border'
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button className='border bg-gray-100' type='submit'>
        S'inscrire
      </button>
    </form>
  );
};

export default SignUpForm;
