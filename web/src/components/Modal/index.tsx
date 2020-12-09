import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { Content } from './styles';

interface Athlete {
  id: string;
  name: string;
  birthDate: Date;
  phoneNumber: string;
  dueDate: Date;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  selectedAthlete: Athlete;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  selectedAthlete,
}) => {
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
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: 'var(--background-color)',
          color: 'var(--primary-text-color)',
          borderRadius: '8px',
          width: '480px',
          border: 'none',
        },
        overlay: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Content>
        <h1>O que deseja fazer?</h1>
        <Link to={{ pathname: 'aluno-detalhes', search: selectedAthlete.id }}>
          Editar Dados
        </Link>
        <Link to="aluno-mensalidades">Gerenciar Mensalidades</Link>
        <Link to="aluno-indicacoes">Grupo de Indicações</Link>
        <Link to="aluno-avaliacao">Avaliação física</Link>
      </Content>
    </ReactModal>
  );
};

export default Modal;
