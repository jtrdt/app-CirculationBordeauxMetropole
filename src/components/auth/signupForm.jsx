import React, { useState } from 'react';
var validator = require('email-validator');

const SignUpForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailValidator = validator.validate(email);

  const signupUser = async e => {
    e.preventDefault();
    const resSignUp = await fetch(process.env.NEXT_PUBLIC_SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    if (resSignUp.status !== 201) {
      const error = document.getElementById('errorSignUp');
      return (error.innerHTML = "Erreur lors de l'inscription");
    }
    window.location.href = '/';
  };

  return (
    <form onSubmit={signupUser} className='w-80'>
      <h3 className='font-bold m-1'>S'inscrire</h3>
      <div className='bg-transparent-bg p-5 rounded-md'>
        <label htmlFor='name' className='flex flex-col'>
          Email
          <input
            name='email'
            type='email'
            className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor='password' className='flex flex-col'>
          Mot de passe
          <input
            name='password'
            type='password'
            className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <p id='errorSignUp' className='text-red-600'></p>
        <div className='flex'>
          {emailValidator ? (
            <button
              className='border bg-green-600 hover:bg-green-800 text-white font-medium px-2 py-1 w-full rounded-md mr-1'
              type='submit'
            >
              S'inscrire
            </button>
          ) : (
            <button
              className='border bg-disable-button text-disable-button-text border-disable-button-border font-medium px-2 py-1 w-full rounded-md mr-1'
              type='submit'
              disabled
            >
              S'inscrire
            </button>
          )}
          <button
            className='border border-green-600 hover:bg-green-600 hover:text-white hover:border-white font-medium px-2 py-1 w-full rounded-md ml-1'
            onClick={() => (window.location.href = '/')}
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
