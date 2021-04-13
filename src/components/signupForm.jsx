import React from 'react';

const SignUpForm = () => {
  const signupUser = async (event) => {
    event.preventDefault();

    const name = event.target.name.value.replace(/[\s-]/g, '');
    const firstLetterOfFirstName = event.target.firstname.value.charAt(0);
    const login = (firstLetterOfFirstName + name).toLowerCase();

    const res = await fetch(process.env.NEXT_PUBLIC_SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: login,
        password: event.target.password.value
      })
    });
    console.log(res);

    // utilisateur existe déjà
    if (res.status === 403) {
      console.log('user déjà existant');
    }

    // utilisateur crée
    if (res.status === 201) {
      console.log('signup ok');
    }
  };

  return (
    <form onSubmit={signupUser} className='m-1 border p-2 flex-col max-w-min'>
      <h3 className='font-bold m-1'>SIGNUP</h3>
      <label htmlFor='name'>
        <input
          id='name'
          name='name'
          type='text'
          placeholder='Nom'
          autoComplete='name'
          className='m-2 border'
          required
        />
      </label>
      <label htmlFor='firstname'>
        <input
          id='firstname'
          type='text'
          placeholder='Prénom'
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

export default SignUpForm;
