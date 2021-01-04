import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Pagination from '../../components/Pagination';
import api from '../../services/apiClient';
import { formatDate } from '../../utils/formatDate';
import { AthletesTable, AthleteRow, Container, ActiveCounter } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

interface Athlete {
  id: string;
  name: string;
  birthDate: Date;
  phoneNumber: string;
  active: boolean;
}

interface SearchData {
  text: string;
}

const Athletes: React.FC = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState<string>('');
  const [activeCount, setActiveCount] = useState<number>(0);

  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSearch = useCallback(async (data: SearchData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        text: Yup.string()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { text } = data;

      setSearchText(text);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro na operação',
        description:
          'Houve um erro na procura pelo aluno. Tente novamente',
      });
    }
  }, [addToast]);

  useEffect(() => {
    api.get(`/athletes/filter?text=${searchText}&page=${activePage}&pageSize=4`).then(response => {
      setAthletes(response.data.athletes);
      setTotalPages(response.data.pages);
    });
    api.get('/athletes/count').then(response => {
      setActiveCount(response.data.count);
    })
  }, [activePage, searchText]);

  return (
    <Container>
      <PageHeader
        title="Alunos"
      />
      <Form ref={formRef} onSubmit={handleSearch}>
        <Input name="text" placeholder="Procurar por nome" />
        <Button type="submit">Procurar</Button>
        <Button type="button" onClick={() => setSearchText('')}>Limpar Busca</Button>
      </Form>
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
            <AthleteRow active={athlete.active} key={athlete.id}>
              <td>{athlete.name}</td>
              <td>{formatDate(athlete.birthDate)}</td>
              <td>{athlete.phoneNumber}</td>
              <td>
                <Link to={{ pathname: 'aluno-detalhes', search: athlete.id }}>
                  Detalhes
                </Link>
              </td>
            </AthleteRow>
          ))}
        </tbody>
      </AthletesTable>
      <ActiveCounter>
        <p>
          Alunos ativos:
            {' '}
          <span>{activeCount}</span>
        </p>
      </ActiveCounter>
      <Pagination
        goToPage={setActivePage}
        totalPages={totalPages}
        activePage={activePage}
      />
    </Container>
  );
};

export default Athletes;
