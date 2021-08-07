import React from 'react';

const Footer = () => {
  return (
    <footer className='h-16 border-t flex justify-center items-center text-base font-normal text-gray-400 bottom-0 bg-transparent-bar'>
      <p>
        Made by{' '}
        <a href='#' rel='nofollow noopener' className='underline'>
          Jerome Tridat
        </a>{' '}
        | Copyright 2021
      </p>
    </footer>
  );
};

export default Footer;
