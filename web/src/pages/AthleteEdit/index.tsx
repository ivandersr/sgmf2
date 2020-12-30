import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiPhone, FiStar, FiUser } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../hooks/toast';
import api from '../../services/apiClient';

import { Container, Content, Details, Menu } from './styles';
import { formatDate } from '../../utils/formatDate';

interface Athlete {
  id: string;
  name: string;
  birthDate: Date;
  phoneNumber: string;
}

interface AthleteEditData {
  name: string;
  birthDate: Date;
  phoneNumber: string;
}

const AthleteEdit: React.FC = () => {
  const { search } = useLocation();
  const athleteId = search.substring(1);
  const [athlete, setAthlete] = useState<Athlete>();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: AthleteEditData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          phoneNumber: Yup.string().required('Telefone obrigatório'),
          birthDate: Yup.string()
            .required('Data de nascimeto obrigatória')
            .test(
              'valid-date',
              'Data deve ser no formato DD/MM/AAAA',
              value => {
                if (value) {
                  return /^\d{2}\/\d{2}\/\d{4}$/.test(value);
                }
                return false;
              },
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, birthDate, phoneNumber } = data;

        const formData = {
          name,
          birthDate,
          phoneNumber,
        };

        await api.put(`/athletes/${athleteId}`, formData);

        history.push('/alunos');
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
            'Houve um erro na atualização de dados. Tente novamente.',
        });
      }
    },
    [addToast, athleteId, history],
  );

  useEffect(() => {
    api.get(`/athletes/${athleteId}`).then(response => {
      setAthlete(response.data);
    });
  }, [athleteId]);

  return (
    <Container>
      <PageHeader title="Detalhes do aluno" />

      {athlete && (
        <Content>
          <Details>
            <h3>{athlete.name}</h3>
            <Form
              ref={formRef}
              initialData={{
                name: athlete.name,
                birthDate: formatDate(athlete.birthDate),
                phoneNumber: athlete.phoneNumber,
              }}
              onSubmit={handleSubmit}
            >
              <Input name="name" icon={FiUser} placeholder="Nome" />
              <Input name="phoneNumber" icon={FiPhone} placeholder="Telefone" />
              <Input
                name="birthDate"
                icon={FiStar}
                placeholder="Data de Nascimento"
              />
              <Button type="submit">Atualizar</Button>
            </Form>
          </Details>
          <Menu>
            <Link to={`/alunos/${athlete.id}/mensalidades`}>
              Receber mensalidade
            </Link>
            <Link to={`/alunos/${athlete.id}/mensalidades`}>
              Receber mensalidade
            </Link>
            <Link to={`/alunos/${athlete.id}/mensalidades`}>
              Receber mensalidade
            </Link>
            <Link to={`/alunos/${athlete.id}/mensalidades`}>
              Receber mensalidade
            </Link>
          </Menu>
        </Content>
      )}
    </Container>
  );
};

export default AthleteEdit;
