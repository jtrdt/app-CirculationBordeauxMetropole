import React, { useState } from 'react';
import Head from 'next/head';
import validator from 'validator';

const SignUpForm = () => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [signupDone, setSignupDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    const error = document.getElementById('errorSignUp');
    const signupOk = document.getElementById('signupOk');
    e.preventDefault();
    setIsLoading(true);
    error.innerHTML = '';
    signupOk.innerHTML = '';
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
      setIsLoading(false);
      return (error.innerHTML = "Erreur lors de l'inscription.");
    }
    setSignupDone(true);
  };

  if (signupDone) {
    return (
      <div>
        <Head>
          <title>PC Circulation Bordeaux Métropole</title>
        </Head>
        <div className='m-auto'>
          <div
            className='rounded-3xl py-8 px-24 border bg-login backdrop-filter backdrop-blur-3xl'
            style={{ width: '640px' }}
          >
            <h3 className='text-2xl text-center pt-3 pb-4 text-white'>
              Vérifiez votre adresse email pour terminer l'inscription. <br />
              <a href='/' className='underline text-base'>
                Revenir à l'acceuil
              </a>
            </h3>
          </div>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={signupUser}>
      <div
        className='rounded-3xl py-8 px-24 border bg-login'
        style={{
          width: '640px',
          backdropFilter: 'blur(40px)'
        }}
      >
        <h3 className='text-2xl text-center pt-3 pb-4 text-white'>
          Poste de commandement Circulation <br />
          Inscription
        </h3>
        <div className='flex'>
          <label
            htmlFor='lastname'
            className='flex flex-col text-white w-1/2 mr-2'
          >
            Nom
            <input
              name='lastname'
              type='lastname'
              minLength='3'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
              onChange={e => setLastname(e.target.value)}
              required
            />
          </label>
          <label
            htmlFor='firstname'
            className='flex flex-col ml-0 mx-auto text-white w-1/2'
          >
            Prénom
            <input
              name='firstname'
              type='firstname'
              minLength='3'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
              onChange={e => setFirstname(e.target.value)}
              required
            />
          </label>
        </div>
        <label htmlFor='email' className='flex flex-col text-white'>
          Email
          <input
            name='email'
            type='email'
            autoComplete='email'
            className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor='password' className='flex flex-col text-white'>
          Mot de passe
          <span className='text-xs text-gray-600'>
            Minimum 8 caractères dont 1 chiffre
          </span>
          <input
            name='password'
            type='password'
            autoComplete='new-password'
            className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
            onChange={e => setPassword(e.target.value)}
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
              autoComplete='new-password'
              className='mt-1 mb-4 rounded-md border-2 px-2 py-3 pl-4 leading-5 border-blue-300 text-black'
              onChange={e => setConfirmPwd(e.target.value)}
              required
            />
          )}
        </label>
        <p id='errorSignUp' className='text-red-600'></p>
        <p id='signupOk' className='text-gray-600'></p>
        <div className='flex py-3'>
          {isLoading ? (
            <button className='btn border bg-blue-300 text-disable-button-text border-disable-button-border font-medium px-2 py-3 w-1/2 rounded-md mr-1 cursor-not-allowed loading'>
              Inscription en cours
            </button>
          ) : isFormOk() ? (
            <button
              className='border bg-blue-400 hover:bg-blue-500 text-white font-medium px-2 py-3 w-1/2 rounded-md mr-1'
              type='submit'
            >
              S'inscrire
            </button>
          ) : (
            <button className='border bg-blue-300 text-disable-button-text border-disable-button-border font-medium px-2 py-3 w-1/2 rounded-md mr-1 cursor-not-allowed'>
              S'inscrire
            </button>
          )}
          <button
            className='border border-blue-300 hover:bg-blue-300 hover:text-white hover:border-white font-medium px-2 py-3 w-1/2 rounded-md ml-1'
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
