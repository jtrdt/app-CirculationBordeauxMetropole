import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Boucle from '../../src/components/bouclesComp/boucle.jsx';
import BoucleForm from '../../src/components/bouclesComp/boucleForm.jsx';
import Layout from '../../src/components/layout/layout.jsx';

const Boucles = ({ boucleData }) => {
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
          <BoucleForm />
          <button onClick={handleCloseModal}>Fermer</button>
        </ReactModal>
        Ajouter une nouvelle entrée
      </button>
      {boucleData.map((data, i) => (
        <Boucle data={data} key={i} />
      ))}
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_BOUCLE_URL);
  const boucleData = await res.json();
  return {
    props: { boucleData }
  };
}

export default Boucles;
