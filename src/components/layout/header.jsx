import React from 'react';

const Header = () => {
  return (
    <header className='header font-semibold text-white p-7 flex flex-col justify-center items-center h-40 bg-transparent-header'>
      <img
        src='https://fichiers.bordeaux-metropole.fr/LOGOS/LOGO-BXM/BM_logo_positif/BM_logo_positif_CMYK_horiz.png'
        alt='Logo Bordeaux Métropole couleur'
        width={283}
        height={124}
        className='left-20 absolute'
      />
      <h1 className='text-3xl font-medium'>PC Circulation Bordeaux Métropole</h1>
    </header>
  );
};

export default Header;
