import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import jwt_decode from 'jwt-decode';
import BoucleForm from '../../src/components/bouclesComp/boucleForm.jsx';
import Layout from '../../src/components/layout/layout.jsx';
import Tables from '../../src/components/tables.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Boucles = ({ boucleData, carf }) => {
  const [user, setUser] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      const decoded = jwt_decode(userToken);
      setUser(decoded.userId);
    }
  });

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = e => {
    e.stopPropagation();
    setShowForm(false);
  };

  return (
    <Layout>
      {user && (
        <button
          onClick={handleOpenForm}
          className='btnAdd my-2 px-4 py-2 bg-bg-button text-white font-medium hover:bg-gray-700 rounded-md'
        >
          <FontAwesomeIcon icon={faPlus} className='addIcon' />
          Ajouter une nouvelle boucle
        </button>
      )}
      <ReactModal
        isOpen={showForm}
        onRequestClose={handleCloseForm}
        shouldFocusAfterRender={false}
        ariaHideApp={false}
        style={{
          content: {
            position: 'relative',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            padding: 0,
            borderRadius: '6px',
            backgroundColor: 'white'
          }
        }}
      >
        <BoucleForm data={carf} />
      </ReactModal>
      <Tables data={boucleData} editCarf={handleOpenForm} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BOUCLE_URL);
  const boucleData = await res.json();
  const resOpenData = await fetch(
    `https://data.bordeaux-metropole.fr/geojson?key=${process.env.NEXT_PUBLIC_OPENDATA_KEY}&typename=pc_carf_p`
  );
  const carf = await resOpenData.json();
  return {
    props: { boucleData, carf }
  };
};

export default Boucles;
