import { LinearProgress, TextField } from '@material-ui/core';
import Image from 'next/image';
import React, { useState } from 'react';
import validator from 'validator';
import LogoBdxMetro from '../../../public/BM_logo_positif_CMYK_horiz.png';

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const resetPassword = async e => {
    e.preventDefault();
    setIsLoading(true);
    const emailOk = document.getElementById('emailOk');
    const error = document.getElementById('errorMail');
    error.innerHTML = '';
    emailOk.innerHTML = '';
    const emailValidator = validator.isEmail(email);
    if (!emailValidator) {
      setIsLoading(false);
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
    setIsLoading(false);
    return (emailOk.innerText =
      'Si un compte associé à cette adresse  existe, vous allez recevoir un email rapidement.');
  };

  return (
    <form onSubmit={resetPassword}>
      <div className='rounded-3xl py-8 px-24 bg-white backdrop-filter backdrop-blur-3xl max-w-2xl border-4 border-blue-800'>
        <div className='text-center'>
          <Image
            src={LogoBdxMetro}
            alt='Logo Bordeaux Métropole'
            placeholder='blur'
          />
        </div>
        <p className='text-lg pb-3 '>
          Entrez votre adresse email et nous vous enverrons un lien pour
          réinitialiser votre mot de passe. <br />
        </p>
        {/*  <label htmlFor='email' className='flex flex-col'>
          <input
            id='email'
            name='email'
            typeof='text'
            placeholder='Email'
            className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
            onChange={e => setEmail(e.target.value)}
            required
          /> */}
        <label htmlFor='email' className='flex flex-col mb-6'>
          <TextField
            id='email'
            label='Email'
            required
            size='small'
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        {isLoading ? (
          <LinearProgress className='w-64 mb-6 mx-auto' />
        ) : (
          <div className='border w-64 mx-auto mb-6 border-blue-800'></div>
        )}
        <p id='errorMail' className='text-red-600 mb-6'></p>
        <p id='emailOk' className='text-gray-600 mb-6'></p>
        <div className='text-center'>
          <a href='/' className='hover:underline text-base underline'>
            Revenir à l'accueil.
          </a>
        </div>
        <button type='submit' className='hidden' />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
