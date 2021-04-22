import React, { useState } from 'react';
import ReactModal from 'react-modal';
import BoucleModal from './boucleModal';

const Boucle = ({ data }) => {
  // const [modalIsOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  return (
    <div>
      <div
        className='bg-blue-100 flex mx-2 my-1 hover:shadow-md'
        // onClick={openModal}
      >
        <span className='px-2 border-r border-black'>id : {data._id}</span>
        <span className='px-2 border-r border-black'>zone : {data.zone}</span>
        <span className='px-2 border-r border-black'>
          carrefour : {data.crossroad}
        </span>
        <span className='px-2 border-r border-black'>label : {data.label}</span>
        <span className='px-2 border-r border-black sha'>
          comment : {data.comment}
        </span>
      </div>
      {/* <div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={{
            content: {
              top: '0',
              right: '0',
              left: 'auto',
              bottom: '0',
              background: '#ddd',
              width: '500px',
              paddingTop: '50px',
              paddingLeft: '50px'
            }
          }}>
          <BoucleModal data={data} />
        </ReactModal>
      </div> */}
    </div>
  );
};

export default Boucle;
