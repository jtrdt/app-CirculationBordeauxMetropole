import React from 'react';
import Image from 'next/image';
import LogoBdxMetro from '../../../public/BM_logo_positif_CMYK_horiz.png';

const Header = () => {
  return (
    <header className='header font-semibold text-white p-7 flex flex-col justify-center items-center h-40 bg-transparent-header'>
      <a href='/boucle' className='left-20 absolute'>
        <Image
          src={LogoBdxMetro}
          alt='Logo Bordeaux Métropole couleur'
          placeholder='blur'
        />
      </a>
      <h1 className='text-3xl font-medium select-none'>
        PC Circulation Bordeaux Métropole
      </h1>
    </header>
  );
};

export default Header;
