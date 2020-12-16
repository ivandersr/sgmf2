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
}

const Athletes: React.FC = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete>(
    {} as Athlete,
  );
  const [modalOpen, setModalOpen] = useState(false);

  const { signOut } = useAuth();

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handleSelectedAthlete = useCallback(
    (athlete: Athlete) => {
      setSelectedAthlete(athlete);
      toggleModal();
    },
    [toggleModal],
  );

  useEffect(() => {
    api.get('/athletes?page=1&pageSize=11').then(response => {
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
            <th style={{ visibility: 'hidden' }}>Botões</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map(athlete => (
            <AthleteRow key={athlete.id}>
              <td>{athlete.name}</td>
              <td>{athlete.birthDate}</td>
              <td>{athlete.phoneNumber}</td>
              <td>
                <Button onClick={() => handleSelectedAthlete(athlete)}>
                  Editar
                </Button>
                <Modal
                  isOpen={modalOpen}
                  setIsOpen={() => toggleModal()}
                  selectedAthlete={selectedAthlete}
                />
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
