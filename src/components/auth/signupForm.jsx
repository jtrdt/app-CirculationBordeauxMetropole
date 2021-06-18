import React, { useState } from 'react';
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
    <form onSubmit={signupUser} className='w-96'>
      <h3 className='font-bold m-1'>S'inscrire</h3>
      <div className='bg-transparent-bg p-5 rounded-md'>
        <div className='flex'>
          <label htmlFor='name' className='flex flex-col ml-0 mx-auto'>
            Prénom
            <input
              name='firstname'
              type='firstname'
              minLength='3'
              className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
              onChange={e => setFirstname(e.target.value)}
              required
            />
          </label>
          <label htmlFor='name' className='flex flex-col'>
            Nom
            <input
              name='lastname'
              type='lastname'
              minLength='3'
              className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
              onChange={e => setLastname(e.target.value)}
              required
            />
          </label>
        </div>
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
          <span className='text-xs text-gray-500'>
            Minimum 8 caractères dont 1 chiffre
          </span>
          <input
            name='password'
            type='password'
            className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor='password' className='flex flex-col'>
          Confirmer le mot de passe
          <input
            name='confirm password'
            type='password'
            className='mt-1 mb-4 rounded-md border px-2 py-1 leading-5'
            onChange={e => setConfirmPwd(e.target.value)}
            required
          />
        </label>
        <p id='errorSignUp' className='text-red-600'></p>
        <div className='flex'>
          {isFormOk() ? (
            <button
              className='border bg-green-600 hover:bg-green-800 text-white font-medium px-2 py-1 w-full rounded-md mr-1'
              type='submit'
            >
              S'inscrire
            </button>
          ) : (
            <button className='border bg-disable-button text-disable-button-text border-disable-button-border font-medium px-2 py-1 w-full rounded-md mr-1 cursor-not-allowed'>
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
