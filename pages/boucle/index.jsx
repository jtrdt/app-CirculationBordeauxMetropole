import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Boucle from '../../src/components/bouclesComp/boucle.jsx';
import BoucleForm from '../../src/components/bouclesComp/boucleForm.jsx';
import Layout from '../../src/components/layout/layout.jsx';

const Boucles = ({ boucleData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  // looks cool, doesn't work
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Layout>
      <div>
        <h1>Tableau des boucles coupées</h1>
        <button
          onClick={openModal}
          className='bg-gray-400 border hover:bg-gray-300'
        >
          <div>
            <ReactModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              shouldFocusAfterRender={false}
              style={{
                content: {
                  position: 'relative',
                  top: '100px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '700px'
                }
              }}
              ariaHideApp={false}
            >
              <BoucleForm />
            </ReactModal>
          </div>
          Ajouter une nouvelle entrée
        </button>
        {boucleData.map((data, i) => (
          <Boucle data={data} key={i} />
        ))}
      </div>
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
