import React, { useState } from 'react';

const BoucleModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return(
    <div>
      <ReactModal>
        
      </ReactModal>
    </div>
  )
};

export default BoucleModal;
