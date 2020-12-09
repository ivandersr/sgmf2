import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';

import { useAuth } from '../../hooks/auth';
import api from '../../services/apiClient';

import { AthletesTable, AthleteRow, Container } from './styles';

interface Athlete {
  id: string;
  name: string;
  birthDate: Date;
  phoneNumber: string;
  dueDate: Date;
}

const Athletes: React.FC = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const { signOut } = useAuth();

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  useEffect(() => {
    api.get('/athletes?page=1&pageSize=10').then(response => {
      setAthletes(response.data);
    });
  }, []);

  return (
    <Container>
      <PageHeader title="Alunos" />
      <AthletesTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Próximo Vencimento</th>
            <th style={{ visibility: 'hidden' }}>Botões</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map(athlete => (
            <AthleteRow key={athlete.id}>
              <td>{athlete.name}</td>
              <td>{athlete.birthDate}</td>
              <td>{athlete.phoneNumber}</td>
              <td>{athlete.dueDate}</td>
              <td>
                <Button onClick={() => toggleModal()}>Editar</Button>
                <Modal isOpen={modalOpen} setIsOpen={toggleModal} />
              </td>
            </AthleteRow>
          ))}
        </tbody>
      </AthletesTable>
      <Button onClick={() => signOut()}>Sair</Button>
    </Container>
  );
};

export default Athletes;
