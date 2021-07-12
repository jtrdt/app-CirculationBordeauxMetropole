import React, { useState } from 'react';
import Image from 'next/image';
import validator from 'validator';

const SignUpForm = () => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const isFormOk = () => {
    const emailValidator = validator.isEmail(email);
    const passwordValidator = validator.isStrongPassword(password, {
      minUppercase: 0,
      minSymbols: 0
    });
    if (
      confirmPwd === password &&
      emailValidator &&
      passwordValidator &&
      lastname.length >= 3 &&
      firstname.length >= 3
    ) {
      return true;
    }
  };

  const signupUser = async e => {
    e.preventDefault();
    const resSignUp = await fetch(process.env.NEXT_PUBLIC_SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password
      })
    });
    if (resSignUp.status !== 201) {
      const error = document.getElementById('errorSignUp');
      return (error.innerHTML = "Erreur lors de l'inscription");
    }
    window.location.href = '/';
  };

  return (
    <form onSubmit={signupUser}>
      <div
        className='rounded-3xl py-8 px-24 border bg-login'
        style={{
          width: '640px',
          backdropFilter: 'blur(40px)'
        }}>
        <div className='text-center'>
          <a href='/'>
            <Image
              src={'/BM_logo_positif_CMYK_horiz.png'}
              alt='Logo Bordeaux Métropole'
              width='283px'
              height='124px'
            />
          </a>
        </div>
        <h3 className='text-2xl text-center pt-3 pb-4 text-white'>
          Poste de commandement Circulation <br />
          Inscription
        </h3>
        <div>
          <label
            htmlFor='name'
            className='flex flex-col ml-0 mx-auto text-white'>
            Prénom
            <input
              name='firstname'
              type='firstname'
              minLength='3'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
              onChange={e => setFirstname(e.target.value)}
              // placeholder='Prénom'
              required
            />
          </label>
          <label htmlFor='name' className='flex flex-col text-white'>
            Nom
            <input
              name='lastname'
              type='lastname'
              minLength='3'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
              onChange={e => setLastname(e.target.value)}
              // placeholder='Nom'
              required
            />
          </label>
        </div>
        <label htmlFor='name' className='flex flex-col text-white'>
          Email
          <input
            name='email'
            type='email'
            className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
            onChange={e => setEmail(e.target.value)}
            // placeholder='Email'
            required
          />
        </label>
        <label htmlFor='password' className='flex flex-col text-white'>
          Mot de passe
          <span className='text-xs text-gray-500'>
            Minimum 8 caractères dont 1 chiffre
          </span>
          <input
            name='password'
            type='password'
            className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
            onChange={e => setPassword(e.target.value)}
            // placeholder="Mot de passe"
            required
          />
        </label>
        <label htmlFor='password' className='flex flex-col text-white'>
          Confirmer le mot de passe
          {confirmPwd.length >= 3 && confirmPwd !== password ? (
            <input
              name='confirm password'
              type='password'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-red-500 text-black'
              onChange={e => setConfirmPwd(e.target.value)}
              required
            />
          ) : (
            <input
              name='confirm password'
              type='password'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
              onChange={e => setConfirmPwd(e.target.value)}
              // placeholder='Confirmer le mot de passe'
              required
            />
          )}
        </label>
        <p id='errorSignUp' className='text-red-600'></p>
        <div className='flex pt-3'>
          {isFormOk() ? (
            <button
              className='border bg-blue-400 hover:bg-blue-500 text-white font-medium px-2 py-3 w-full rounded-md mr-1'
              type='submit'>
              S'inscrire
            </button>
          ) : (
            <button className='border bg-blue-300 text-disable-button-text border-disable-button-border font-medium px-2 py-3 w-full rounded-md mr-1 cursor-not-allowed'>
              S'inscrire
            </button>
          )}
          <button
            className='border border-blue-300 hover:bg-blue-300 hover:text-white hover:border-white font-medium px-2 py-3 w-full rounded-md ml-1'
            onClick={() => (window.location.href = '/')}>
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
