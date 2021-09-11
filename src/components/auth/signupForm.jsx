import { Button, CircularProgress, TextField } from '@material-ui/core';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import validator from 'validator';
import LogoBdxMetro from '../../../public/BM_logo_positif_CMYK_horiz.png';

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
    const resSignUp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password
        })
      }
    );
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
          <div className='rounded-3xl py-8 px-24 bg-white backdrop-filter backdrop-blur-3xl max-w-2xl border-4 border-blue-800'>
            <div className='text-center'>
              <Image
                src={LogoBdxMetro}
                alt='Logo Bordeaux Métropole'
                placeholder='blur'
              />
            </div>
            <h3 className='text-2xl text-center pt-3 pb-4 '>
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
      <div className='rounded-3xl py-8 px-24 bg-white backdrop-filter backdrop-blur-3xl max-w-2xl border-4 border-blue-800'>
        <div className='text-center'>
          <Image
            src={LogoBdxMetro}
            alt='Logo Bordeaux Métropole'
            placeholder='blur'
          />
        </div>
        <h3 className='text-2xl text-center pt-3 pb-4 '>Inscription</h3>
        <div className='flex mb-4'>
          <label htmlFor='lastname' className='flex flex-col w-1/2 mr-2'>
            <TextField
              id='lastname'
              label='Nom'
              required
              size='small'
              onChange={e => setLastname(e.target.value)}
            />
          </label>
          <label
            htmlFor='firstname'
            className='flex flex-col ml-0 mx-auto w-1/2'
          >
            <TextField
              id='firstname'
              label='Prénom'
              required
              size='small'
              onChange={e => setFirstname(e.target.value)}
            />
          </label>
        </div>
        <label htmlFor='email' className='flex flex-col mb-4'>
          <TextField
            id='email'
            label='Email'
            required
            size='small'
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor='password' className='flex flex-col mb-4'>
          <TextField
            id='password'
            label='Mot de passe'
            required
            size='small'
            type='password'
            onChange={e => setPassword(e.target.value)}
          />
          <span className='text-xs text-gray-600'>
            Minimum 8 caractères dont 1 chiffre
          </span>
        </label>
        <label htmlFor='password' className='flex flex-col mb-4'>
          {confirmPwd.length >= 3 && confirmPwd !== password ? (
            <TextField
              error
              id='standard-error-helper-text'
              label='Confirmer mot de passe'
              type='password'
              onChange={e => setConfirmPwd(e.target.value)}
            />
          ) : (
            <TextField
              id='confirm-password'
              label='Confirmer mot de passe'
              required
              size='small'
              type='password'
              onChange={e => setConfirmPwd(e.target.value)}
            />
          )}
        </label>
        <p id='errorSignUp' className='text-red-600'></p>
        <p id='signupOk' className='text-gray-600'></p>
        <div className='flex py-3'>
          {isLoading ? (
            // <button
            //   className='border bg-blue-200 font-medium px-2 py-3 w-1/2 rounded-md mr-1'
            //   disabled
            // >
            //   Inscription en cours
            // </button>
            <Button
              variant='contained'
              color='primary'
              disabled
              className='w-1/2'
            >
              <CircularProgress size='20px' />
            </Button>
          ) : isFormOk() ? (
            // <button
            //   className='border bg-blue-400 hover:bg-blue-500  font-medium px-2 py-3 w-1/2 rounded-md mr-1'
            //   type='submit'
            // >
            //   S'inscrire
            // </button>
            <Button variant='contained' color='primary' className='w-1/2'>
              S'inscrire
            </Button>
          ) : (
            // <button className='border bg-blue-300 text-disable-button-text border-disable-button-border font-medium px-2 py-3 w-1/2 rounded-md mr-1 cursor-not-allowed'>
            //   S'inscrire
            // </button>
            <Button
              variant='contained'
              color='primary'
              disabled
              className='w-1/2'
            >
              S'inscrire
            </Button>
          )}
          {/* <button
            className='border border-blue-300 hover:bg-blue-300 hover: hover:border-white font-medium px-2 py-3 w-1/2 rounded-md ml-1'
            onClick={() => (window.location.href = '/')}
          >
            Annuler
          </button> */}
          <Button
            variant='outlined'
            color='primary'
            className='w-1/2'
            style={{ marginLeft: 6 }}
            onClick={() => (window.location.href = '/')}
          >
            Annuler
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
