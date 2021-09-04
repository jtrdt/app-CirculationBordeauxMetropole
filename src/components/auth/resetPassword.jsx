import React from 'react';
import { useState } from 'react';
import validator from 'validator';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');

  const resetPassword = async e => {
    const emailOk = document.getElementById('emailOk');
    const error = document.getElementById('errorMail');
    e.preventDefault();
    error.innerHTML = '';
    emailOk.innerHTML = '';
    const emailValidator = validator.isEmail(email);
    if (!emailValidator) {
      return (error.innerHTML = "Format de l'adresse email incorrect");
    }
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/requestresetpassword`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email
        })
      }
    );
    return (emailOk.innerHTML =
      'Si un compte associé à cette adresse  existe, vous allez recevoir un email rapidement.');
  };

  return (
    <form onSubmit={resetPassword}>
      <div className='rounded-3xl py-8 px-24 border bg-login backdrop-filter backdrop-blur-3xl max-w-2xl'>
        <h3 className='text-2xl text-center pt-3 pb-4 text-white'>
          Mot de passe oublié ?
        </h3>
        <p className='text-lg pb-3 text-white'>
          Entrez votre adresse email et nous vous enverrons un lien pour
          réinitialiser votre mot de passe. <br />
        </p>
        <label htmlFor='email' className='flex flex-col'>
          <input
            id='email'
            name='email'
            typeof='text'
            placeholder='Email'
            className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <p id='errorMail' className='text-red-600'></p>
        <p id='emailOk' className='text-gray-600'></p>
        <a href='/' className='hover:underline text-base text-white'>
          Revenir à l'accueil.
        </a>
        <button type='submit' className='hidden' />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
