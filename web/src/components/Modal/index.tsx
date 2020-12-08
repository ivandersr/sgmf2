import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  children: unknown;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={modalStatus}
      onRequestClose={setIsOpen}
      shouldCloseOnOverlayClick
      ariaHideApp={false}
      style={{
        content: {
          background: 'transparent',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
