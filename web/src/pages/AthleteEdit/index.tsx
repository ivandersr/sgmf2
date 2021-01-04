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
import Select from '../../components/Select';

interface Subscription {
  id: string;
  title: string;
}

interface AthleteGroup {
  id: string;
  title: string;
}

interface Athlete {
  id: string;
  name: string;
  birthDate: Date;
  phoneNumber: string;
  subscription: Subscription;
  athleteGroup: AthleteGroup;
}

interface AthleteEditData {
  name: string;
  birthDate: Date;
  phoneNumber: string;
  subscription_id: string;
  athlete_group_id: string;
}

interface SelectOptions {
  value: string;
  label: string;
}

const AthleteEdit: React.FC = () => {
  const { search } = useLocation();
  const athleteId = search.substring(1);
  const [athlete, setAthlete] = useState<Athlete>();
  const [
    subscriptionOptions, setSubscriptionOptions
  ] = useState<SelectOptions[]>([]);

  const [
    athleteGroupOptions, setAthleteGroupOptions
  ] = useState<SelectOptions[]>([]);


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
          subscription_id: Yup.string().required('Plano obrigatório'),
          athlete_group_id: Yup.string().required('Categoria obrigatória')
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/athletes/${athleteId}`, data);

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
    api.get('/subscriptions?page=0&pageSize=100').then(response => {
      const subs: Subscription[] = response.data.subscriptions;
      setSubscriptionOptions(
        subs.map(sub => (
          {
            value: sub.id,
            label: sub.title
          }
        ))
      );
    });
    api.get('/athletegroups').then(response => {
      const athlGroups: AthleteGroup[] = response.data;
      setAthleteGroupOptions(
        athlGroups.map(athlGroup => (
          {
            value: athlGroup.id,
            label: athlGroup.title,
          }
        ))
      );
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
              <Select
                name="subscription_id"
                options={subscriptionOptions}
                defaultValue={{
                  value: athlete.subscription.id,
                  label: athlete.subscription.title
                }}
              />
              <Select
                name="athlete_group_id"
                options={athleteGroupOptions}
                defaultValue={{
                  value: athlete.athleteGroup.id,
                  label: athlete.athleteGroup.title
                }}
              />
              <Button type="submit">Atualizar</Button>
            </Form>
          </Details>
          <Menu>
            <Link to={`/alunos/${athlete.id}/pagar-mensalidade`}>
              Receber mensalidade
            </Link>
            <Link to={`/alunos/${athlete.id}/mensalidades-pagas`}>
              Pagamentos anteriores
            </Link>
          </Menu>
        </Content>
      )}
    </Container>
  );
};

export default AthleteEdit;
