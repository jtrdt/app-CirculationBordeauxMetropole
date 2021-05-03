import React, { useState } from 'react';
import ReactModal from 'react-modal';
import BoucleForm from '../../src/components/bouclesComp/boucleForm.jsx';
import Table from '../../src/components/bouclesComp/table.jsx';
import Layout from '../../src/components/layout/layout.jsx';

const Boucles = ({ boucleData, carf }) => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = (e) => {
    e.stopPropagation();
    setShowForm(false);
  };

  return (
    <Layout>
      <h1 className='text-white'>Tableau des boucles coupées</h1>
      <button
        onClick={handleOpenForm}
        className='bg-gray-400 border hover:bg-gray-300'
      >
        Ajouter une nouvelle entrée
      </button>
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
            width: '700px'
          }
        }}
      >
        <p>Ajoutez une nouvelle boucle coupée</p>
        <BoucleForm data={carf} />
        <button onClick={handleCloseForm}>Fermer</button>
      </ReactModal>
      <Table data={boucleData}/>
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
