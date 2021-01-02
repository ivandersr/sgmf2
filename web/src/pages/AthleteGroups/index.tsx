import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import api from '../../services/apiClient';
import { AthleteGroupsTable, AthleteGroupRow, Container } from './styles';

interface AthleteGroup {
  id: string;
  title: string;
  description: number;
}

const Subscriptions: React.FC = () => {
  const [athleteGroups, setAthleteGroups] = useState<AthleteGroup[]>([]);

  useEffect(() => {
    api.get(`/athletegroups`).then(response => {
      setAthleteGroups(response.data);
    });
  }, []);

  return (
    <Container>
      <PageHeader
        title="Categorias"
      />
      <AthleteGroupsTable>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Descrição</th>
            <th style={{ visibility: 'hidden' }}>Botões</th>
          </tr>
        </thead>
        <tbody>
          {athleteGroups.map(athleteGroup => (
            <AthleteGroupRow key={athleteGroup.id}>
              <td>{athleteGroup.title}</td>
              <td>{athleteGroup.description}</td>
              <td>
                <Link to={{
                  pathname: 'categoria-detalhes',
                  search: athleteGroup.id
                }}
                >
                  Detalhes
                </Link>
              </td>
            </AthleteGroupRow>
          ))}
        </tbody>
      </AthleteGroupsTable>
    </Container>
  );
};

export default Subscriptions;
