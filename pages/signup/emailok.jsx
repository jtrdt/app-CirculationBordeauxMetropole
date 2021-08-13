import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import LogoBdxMetro from '../../public/BM_logo_positif_CMYK_horiz.png';

const Home = () => {
  return (
    <div className='bg-home h-screen flex'>
      <Head>
        <title>PC Circulation Bordeaux Métropole</title>
      </Head>
      <div className='m-auto'>
        <div
          className='rounded-3xl py-8 px-20 border bg-login'
          style={{
            width: '640px',
            backdropFilter: 'blur(40px)'
          }}>
          <div className='text-center'>
            <Image
              src={LogoBdxMetro}
              alt='Logo Bordeaux Métropole'
              placeholder='blur'
            />
          </div>
          <h3 className='text-2xl text-center pt-3 pb-4 text-white'>
            Adresse email vérifiée, vous pouvez vous connecter. <br />
            <a href='/' className='underline text-base'>
              Revenir à l'acceuil
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
