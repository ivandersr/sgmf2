import React from 'react';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';

import { useAuth } from '../../hooks/auth';

import { AthletesTable, AthleteRow, Container } from './styles';

const Athletes: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <PageHeader title="Alunos" />
      <AthletesTable>
        <thead>
          <th>Nome</th>
          <th>Data de Nascimento</th>
          <th>Telefone</th>
          <th>Próximo Vencimento</th>
          <th style={{ visibility: 'hidden' }}>Botões</th>
        </thead>
        <tbody>
          <AthleteRow>
            <td>Nome Teste</td>
            <td>06/06/06</td>
            <td>4499984511</td>
            <td>06/06/06</td>
            <td>
              <Button>Editar</Button>
            </td>
          </AthleteRow>
        </tbody>
      </AthletesTable>
      <Button onClick={() => signOut()}>Sair</Button>
    </Container>
  );
};

export default Athletes;
