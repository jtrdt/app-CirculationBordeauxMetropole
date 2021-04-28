import React, { useState } from 'react';
import ReactModal from 'react-modal';
import BoucleForm from '../../src/components/bouclesComp/boucleForm.jsx';
import BoucleTable from '../../src/components/bouclesComp/boucleTable.jsx';
import Layout from '../../src/components/layout/layout.jsx';

const Boucles = ({ boucleData, carf }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation(); // jsp pk
    setShowModal(false);
  };

  return (
    <Layout>
      <h1>Tableau des boucles coupées</h1>
      <button
        onClick={handleOpenModal}
        className='bg-gray-400 border hover:bg-gray-300'
      >
        <ReactModal
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          shouldFocusAfterRender={false}
          ariaHideApp={false}
          style={{
            content: {
              position: 'relative',
              top: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '700px'
            }
          }}
        >
          <p>Ajoutez une nouvelle boucle coupée</p>
          <BoucleForm data={carf} />
          <button onClick={handleCloseModal}>Fermer</button>
        </ReactModal>
        Ajouter une nouvelle entrée
      </button>
      <BoucleTable data={boucleData} />
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
